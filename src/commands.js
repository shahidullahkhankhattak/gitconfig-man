const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");
const autocompletePrompt = require("inquirer-autocomplete-prompt");
const { options } = require("./constants");
const {
  getGlobalConfig,
  clearGlobalConfig,
  applyGlobalConfig,
  saveConfigToFile,
  loadConfigFromFile,
} = require("./extendConfig");

// Register autocomplete prompt
inquirer.registerPrompt("autocomplete", autocompletePrompt);

const CONFIGMAN_DIR_PATH = path.join(os.homedir(), ".gitconfigman");
const CONFIGMAN_PATH = path.join(CONFIGMAN_DIR_PATH, ".gitconfigman");
const IS_INITIALIZED = fs.existsSync(CONFIGMAN_DIR_PATH);
let CONFIGMAN_CONTENT = IS_INITIALIZED
  ? JSON.parse(fs.readFileSync(CONFIGMAN_PATH))
  : undefined;

const logger = (type, message) => {
  if (Array.isArray(message)) {
    message = message.join(" ");
  }
  switch (type) {
    case "success":
      console.log(chalk.green(message ? message : ""));
      break;
    case "error":
      console.log(chalk.red(message ? message : ""));
      break;
    case "warning":
      console.log(chalk.yellow(message ? message : ""));
      break;
    case "info":
      console.log(chalk.cyan(message ? message : ""));
      break;
    default:
      console.log(message ? message : "");
      break;
  }
};

const help = function () {
  console.log();
  console.log(chalk.bold.cyan("Git Config Man") + chalk.gray(" - Git Config Profile Manager"));
  console.log();
  console.log(chalk.bold("Usage:") + " gitconfig-man <command> [options]");
  console.log();
  console.log(chalk.bold("Commands:"));
  for (let option of options) {
    console.log(chalk.gray(option.help));
  }
  console.log();
  console.log(chalk.dim("Tip: Run commands without arguments for interactive mode"));
  console.log();
};

const init = function () {
  if (!fs.existsSync(CONFIGMAN_DIR_PATH)) {
    console.log(chalk.cyan("\n⚙️  Initializing Git Config Man...\n"));
    fs.mkdirSync(CONFIGMAN_DIR_PATH);
    logger("success", "✓ Created gitconfig-man directory: " + CONFIGMAN_DIR_PATH);
    
    // Save current git config as default profile
    const defaultProfilePath = path.join(CONFIGMAN_DIR_PATH, "default.json");
    saveConfigToFile(defaultProfilePath);
    logger("success", "✓ Created default profile");
    
    fs.writeFileSync(
      CONFIGMAN_PATH,
      JSON.stringify({ active: "default", available: ["default"] })
    );
    logger("success", "✓ Activated 'default' profile");
    console.log(chalk.green("\n✨ Git Config Man initialized successfully!\n"));
    return;
  }
  logger("info", "gitconfig-man is already initialized");
};

const create = async function (name) {
  if (!IS_INITIALIZED) {
    logger("error", "gitconfig-man is not initialized\n");
    logger(null, "Please initialize gitconfig-man using: gitconfig-man -i\n");
    return;
  }
  if (!name) {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "profileName",
        message: "Enter name for the new profile:",
        validate: (input) => {
          if (!input || input.trim() === "") {
            return "Profile name cannot be empty";
          }
          const profilePath = path.join(CONFIGMAN_DIR_PATH, `${input}.json`);
          if (fs.existsSync(profilePath)) {
            return "A profile with this name already exists";
          }
          return true;
        },
      },
    ]);
    name = answer.profileName;
  }
  
  let { active, available } = CONFIGMAN_CONTENT || {};
  const profilePath = path.join(CONFIGMAN_DIR_PATH, `${name}.json`);
  const exist = fs.existsSync(profilePath);
  
  if (exist) {
    return logger("error", "A profile with similar name already exists");
  }
  
  if (active) {
    // Save current git config to the active profile
    const activeProfilePath = path.join(CONFIGMAN_DIR_PATH, `${active}.json`);
    saveConfigToFile(activeProfilePath);
    logger("success", `Saved current git config to '${active}' profile`);
    
    // Create new empty profile
    fs.writeFileSync(profilePath, JSON.stringify({}, null, 2));
    logger("success", `Created new profile: ${name}`);
    
    const { switchNow } = await inquirer.prompt([
      {
        type: "confirm",
        name: "switchNow",
        message: `Do you want to switch to newly created profile (${name})?`,
        default: true,
      },
    ]);
    
    available.push(name);
    
    if (switchNow) {
      // Clear current config and switch to new empty profile
      clearGlobalConfig();
      fs.writeFileSync(
        CONFIGMAN_PATH,
        JSON.stringify({ active: name, available })
      );
      logger("success", `Activated profile '${name}'`);
      logger("info", "Current git config has been cleared. Configure it using 'git config --global' commands.");
      return;
    }
    
    fs.writeFileSync(
      CONFIGMAN_PATH,
      JSON.stringify({ active: active, available })
    );
    return logger("success", `Successfully created profile '${name}'`);
  }
};

const list = function () {
  if (!IS_INITIALIZED) {
    logger("error", "gitconfig-man is not initialized\n");
    logger(null, "Please initialize gitconfig-man using: gitconfig-man -i\n");
    return;
  }
  
  console.log(chalk.bold("\nAvailable profiles:"));
  if (CONFIGMAN_CONTENT) {
    const { active, available } = CONFIGMAN_CONTENT;
    available.forEach((profile) => {
      if (profile === active) {
        console.log(chalk.green(`  ✓ ${profile}`) + chalk.gray(" (active)"));
      } else {
        console.log(chalk.white(`  • ${profile}`));
      }
    });
  }
  console.log();
};

const switchProfile = async function (name) {
  if (!IS_INITIALIZED) {
    logger("error", "gitconfig-man is not initialized\n");
    logger(null, "Please initialize gitconfig-man using: gitconfig-man -i\n");
    return;
  }
  
  if (CONFIGMAN_CONTENT) {
    const { active, available } = CONFIGMAN_CONTENT;
    
    // If no name provided, show interactive autocomplete menu
    if (!name) {
      const otherProfiles = available.filter((profile) => profile !== active);
      
      if (otherProfiles.length === 0) {
        return logger("warning", "No other profiles available to switch to");
      }
      
      const answer = await inquirer.prompt([
        {
          type: "autocomplete",
          name: "profileName",
          message: "Select profile to switch to:",
          source: async (answersSoFar, input) => {
            const filtered = otherProfiles.filter((profile) =>
              profile.toLowerCase().includes((input || "").toLowerCase())
            );
            return filtered.map((profile) => ({
              name: profile,
              value: profile,
            }));
          },
          pageSize: 10,
        },
      ]);
      name = answer.profileName;
    }
    
    const profile = available.find((p) => p === name);
    
    if (!profile) {
      return logger("error", `Profile '${name}' not found`);
    }
    
    if (profile === active) {
      return logger("warning", `'${name}' is already the active profile`);
    }
    
    // Save current config to active profile
    const activeProfilePath = path.join(CONFIGMAN_DIR_PATH, `${active}.json`);
    saveConfigToFile(activeProfilePath);
    logger("success", `Saved current git config to '${active}' profile`);
    
    // Load and apply new profile
    const newProfilePath = path.join(CONFIGMAN_DIR_PATH, `${name}.json`);
    const newConfig = loadConfigFromFile(newProfilePath);
    
    // Clear all current config
    clearGlobalConfig();
    
    // Apply new config
    applyGlobalConfig(newConfig);
    
    fs.writeFileSync(CONFIGMAN_PATH, JSON.stringify({ available, active: name }));
    logger("success", `Activated profile '${name}'`);
  } else {
    logger("error", "Data directory is corrupt. Please try uninstalling and reinstalling the package.");
  }
};

const deleteProfile = async function (name) {
  if (!IS_INITIALIZED) {
    logger("error", "gitconfig-man is not initialized\n");
    logger(null, "Please initialize gitconfig-man using: gitconfig-man -i\n");
    return;
  }
  
  let { active, available } = CONFIGMAN_CONTENT || {};
  
  // If no name provided, show interactive autocomplete menu
  if (!name) {
    const deletableProfiles = available.filter(
      (profile) => profile !== "default" && profile !== active
    );
    
    if (deletableProfiles.length === 0) {
      return logger("warning", "No profiles available to delete");
    }
    
    const answer = await inquirer.prompt([
      {
        type: "autocomplete",
        name: "profileName",
        message: "Select profile to delete:",
        source: async (answersSoFar, input) => {
          const filtered = deletableProfiles.filter((profile) =>
            profile.toLowerCase().includes((input || "").toLowerCase())
          );
          return filtered.map((profile) => ({
            name: profile,
            value: profile,
          }));
        },
        pageSize: 10,
      },
    ]);
    name = answer.profileName;
    
    // Confirm deletion
    const { confirmDelete } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmDelete",
        message: `Are you sure you want to delete profile '${name}'?`,
        default: false,
      },
    ]);
    
    if (!confirmDelete) {
      return logger("info", "Deletion cancelled");
    }
  }
  
  if (name === "default") {
    return logger("error", "Default profile cannot be deleted");
  }
  
  const profilePath = path.join(CONFIGMAN_DIR_PATH, `${name}.json`);
  const exist = fs.existsSync(profilePath);
  
  if (active === name) {
    return logger(
      "error",
      "Cannot delete this profile as it is currently active"
    );
  }
  
  if (exist && available.find((p) => p === name)) {
    available.splice(available.indexOf(name), 1);
    fs.rmSync(profilePath, { force: true });
    fs.writeFileSync(
      CONFIGMAN_PATH,
      JSON.stringify({ active, available: available })
    );
    return logger("success", `Successfully deleted profile '${name}'`);
  } else {
    return logger("error", `Couldn't find profile '${name}'`);
  }
};

const version = function () {
  const pkg = require("../package.json");
  console.log(
    chalk.cyan("gitconfig-man") +
      chalk.gray(" version ") +
      chalk.bold(pkg.version)
  );
};

module.exports = {
  version,
  list,
  init,
  help,
  create,
  switch: switchProfile,
  delete: deleteProfile,
};

