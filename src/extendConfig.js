const { execSync } = require("child_process");
const fs = require("fs-extra");

/**
 * Get all global git config settings as an object
 */
const getGlobalConfig = () => {
  try {
    const output = execSync("git config --global --list", {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    
    const config = {};
    const lines = output.trim().split("\n");
    
    lines.forEach((line) => {
      const [key, ...valueParts] = line.split("=");
      if (key) {
        const value = valueParts.join("="); // Handle values with '=' in them
        config[key] = value || "";
      }
    });
    
    return config;
  } catch (error) {
    // If git config fails, return empty object
    return {};
  }
};

/**
 * Set a git config value globally
 */
const setGlobalConfig = (key, value) => {
  try {
    if (value === undefined || value === null || value === "") {
      // Unset the key if value is empty
      execSync(`git config --global --unset ${key}`, {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
      });
    } else {
      // Escape quotes in value
      const escapedValue = value.replace(/"/g, '\\"');
      execSync(`git config --global ${key} "${escapedValue}"`, {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
      });
    }
  } catch (error) {
    // Ignore errors for unset operations on non-existent keys
  }
};

/**
 * Clear all global git config settings
 */
const clearGlobalConfig = () => {
  const config = getGlobalConfig();
  Object.keys(config).forEach((key) => {
    try {
      execSync(`git config --global --unset ${key}`, {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"],
      });
    } catch (error) {
      // Continue even if unset fails
    }
  });
};

/**
 * Apply a saved config object to global git config
 */
const applyGlobalConfig = (config) => {
  Object.keys(config).forEach((key) => {
    setGlobalConfig(key, config[key]);
  });
};

/**
 * Save current git config to a JSON file
 */
const saveConfigToFile = (filePath) => {
  const config = getGlobalConfig();
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
};

/**
 * Load git config from a JSON file
 */
const loadConfigFromFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content);
};

module.exports = {
  getGlobalConfig,
  setGlobalConfig,
  clearGlobalConfig,
  applyGlobalConfig,
  saveConfigToFile,
  loadConfigFromFile,
};

