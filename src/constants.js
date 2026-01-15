const cliOptions = [
  ["i", "init", "  -i           Initialize gitconfig-man and create default profile"],
  ["c", "create", "  -c [name]    Create new git config profile (interactive if no name)"],
  ["s", "switch", "  -s [name]    Switch to another git config profile (interactive if no name)"],
  ["d", "delete", "  -d [name]    Delete git config profile (interactive if no name)"],
  ["ls", "list", "  -ls          List all profiles"],
  ["h", "help", "  -h           Show help"],
  ["v", "version", "  -v           Show version"],
];

const options = [];

module.exports = {
  cliOptions,
  options,
};

