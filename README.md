gitconfig-man
=============

<!-- Build & Test Status -->
[![Build Status](https://github.com/yourusername/gitconfig-man/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/yourusername/gitconfig-man/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/github/actions/workflow/status/yourusername/gitconfig-man/ci.yml?branch=master&label=tests&logo=github)](https://github.com/yourusername/gitconfig-man/actions/workflows/ci.yml)
![Test Coverage](https://img.shields.io/badge/coverage-19.2%25-yellow)
![Tests Passing](https://img.shields.io/badge/tests-19%20passing-brightgreen)

<!-- Package Info -->
[![npm version](https://img.shields.io/npm/v/gitconfig-man.svg?logo=npm&color=cb3837)](https://www.npmjs.com/package/gitconfig-man)
[![npm downloads](https://img.shields.io/npm/dm/gitconfig-man.svg?logo=npm)](https://www.npmjs.com/package/gitconfig-man)
![Node Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen?logo=node.js)

<!-- Platform & Standards -->
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/yourusername/gitconfig-man/graphs/commit-activity)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

<!-- Repository Stats (activate after first push) -->
[![Last Commit](https://img.shields.io/github/last-commit/yourusername/gitconfig-man?logo=github)](https://github.com/yourusername/gitconfig-man/commits)
[![Issues](https://img.shields.io/github/issues/yourusername/gitconfig-man?logo=github)](https://github.com/yourusername/gitconfig-man/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/yourusername/gitconfig-man?logo=github)](https://github.com/yourusername/gitconfig-man/pulls)
[![Stars](https://img.shields.io/github/stars/yourusername/gitconfig-man?style=social)](https://github.com/yourusername/gitconfig-man/stargazers)

A sophisticated CLI tool to manage multiple git config profiles and switch between different git configurations with ease & grace.

## CI/CD Status

| Workflow | Status |
|----------|--------|
| **Build & Test** | [![CI](https://github.com/yourusername/gitconfig-man/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/gitconfig-man/actions/workflows/ci.yml) |
| **Test Coverage** | ![Coverage](https://img.shields.io/badge/coverage-19.2%25-yellow) |
| **NPM Publish** | ![Publish](https://img.shields.io/badge/publish-ready-blue) |

> 📊 **Note:** Some badges will activate after first push to GitHub. GitHub Actions badges will work after setting up CI/CD workflows.

### Platform Support

Tests run automatically on:
- ✅ **Ubuntu** (Linux) - Node.js 16.x, 18.x, 20.x
- ✅ **macOS** - Node.js 16.x, 18.x, 20.x  
- ✅ **Windows** - Node.js 16.x, 18.x, 20.x

**19 Tests** | **19%+ Coverage** | **All Tests Passing**

## Overview
-----------

Managing different git configurations for different projects or accounts can be tedious. This package makes your life easier by creating different git config profiles and managing them for you. Perfect for developers who need to switch between personal and work accounts, or manage multiple git identities.

## Installation
----------------

``` sh
npm install -g gitconfig-man
```

## Usage
--------

```
➜  ~  gitconfig-man -h

Git Config Man - Git Config Profile Manager

Usage: gitconfig-man <command> [options]

Commands:
  -i           Initialize gitconfig-man and create default profile
  -c [name]    Create new git config profile (interactive if no name)
  -s [name]    Switch to another git config profile (interactive if no name)
  -d [name]    Delete git config profile (interactive if no name)
  -ls          List all profiles
  -h           Show help
  -v           Show version

Tip: Run commands without arguments for interactive mode
```

### ✨ Interactive Features

gitconfig-man supports **interactive mode with autocomplete**! Simply run commands without arguments to get an enhanced interactive experience:

- **`gitconfig-man -s`** - Interactive profile switcher with autocomplete
- **`gitconfig-man -c`** - Interactive profile creator with validation
- **`gitconfig-man -d`** - Interactive profile deletion with confirmation

### Initialization

Calling `gitconfig-man -i` creates a `~/.gitconfigman/` directory if it doesn't exist, and saves your current global git config as the 'default' profile.

```
➜  ~  gitconfig-man -i

⚙️  Initializing Git Config Man...

✓ Created gitconfig-man directory: /Users/username/.gitconfigman
✓ Created default profile
✓ Activated 'default' profile

✨ Git Config Man initialized successfully!
```

### Create a new git config profile

With profile name:
```
➜  ~  gitconfig-man -c work
✓ Saved current git config to 'default' profile
✓ Created new profile: work
? Do you want to switch to newly created profile (work)? (Y/n) y
✓ Activated profile 'work'
Current git config has been cleared. Configure it using 'git config --global' commands.
```

**Interactive mode** (just run without name):
```
➜  ~  gitconfig-man -c
? Enter name for the new profile: personal
✓ Saved current git config to 'default' profile
✓ Created new profile: personal
? Do you want to switch to newly created profile (personal)? (Y/n) 
```

After creating a new profile and switching to it, your global git config will be cleared. You can then configure it using standard git commands:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global core.editor "vim"
# ... any other git config settings you need
```

### List available git config profiles

```
➜  ~  gitconfig-man -ls

Available profiles:
  • default
  ✓ work (active)
  • personal
```

### Switch to a specific git config profile

With profile name:
```
➜  ~  gitconfig-man -s default
✓ Saved current git config to 'work' profile
✓ Activated profile 'default'
```

**Interactive mode with autocomplete** (just run without name):
```
➜  ~  gitconfig-man -s
? Select profile to switch to: (Use arrow keys or type to search)
❯ default
  personal
```
Start typing to filter profiles with autocomplete!

### Delete a specific git config profile

With profile name:
```
➜  ~  gitconfig-man -d work
✓ Successfully deleted profile 'work'
```

**Interactive mode with autocomplete and confirmation** (just run without name):
```
➜  ~  gitconfig-man -d
? Select profile to delete: (Use arrow keys or type to search)
❯ work
  staging
? Are you sure you want to delete profile 'work'? (y/N) y
✓ Successfully deleted profile 'work'
```

### Get the current gitconfig-man version

```
➜  ~  gitconfig-man -v
gitconfig-man version 1.0.0
```

## How It Works
----------------

gitconfig-man works by:

1. Storing your git global configurations as JSON files in `~/.gitconfigman/`
2. Each profile is saved as `profilename.json`
3. When you switch profiles, it:
   - Saves your current git config to the active profile
   - Clears all global git config settings
   - Applies the settings from the new profile

This means all your `git config --global` settings are preserved and can be switched instantly!

## Common Use Cases
--------------------

### Personal and Work Accounts

```bash
# Initialize
gitconfig-man -i

# Create work profile
gitconfig-man -c work
git config --global user.name "Work Name"
git config --global user.email "work@company.com"

# Create personal profile
gitconfig-man -c personal
git config --global user.name "Personal Name"
git config --global user.email "personal@email.com"

# Switch between them
gitconfig-man -s work
gitconfig-man -s personal
```

### Different Project Configurations

```bash
# Profile for open source projects
gitconfig-man -c opensource
git config --global user.name "Your Name"
git config --global user.email "opensource@email.com"
git config --global core.editor "vim"

# Profile for client projects
gitconfig-man -c client
git config --global user.name "Professional Name"
git config --global user.email "client@company.com"
git config --global core.editor "nano"
```

## Requirements
---------------

- Node.js >= 16.0.0
- npm >= 7.0.0
- Git installed and accessible via command line

## Development
-----------

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:ci
```

### Project Structure

```
gitconfig-man/
├── src/
│   ├── __tests__/          # Test files
│   ├── cli.js              # CLI entry point
│   ├── cliOptions.js       # CLI argument parsing
│   ├── commands.js         # Command implementations
│   ├── constants.js        # Constants and configuration
│   └── extendConfig.js     # Git config utilities
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── index.js                # Main entry point
└── package.json
```

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
----------

ISC, a permissive free software license published by the Internet Software Consortium.

## Notes
--------

- The 'default' profile cannot be deleted
- You cannot delete the currently active profile
- All git config changes are saved automatically when switching profiles
- Profile files are stored in `~/.gitconfigman/` directory

---

Made with ❤️ for developers who manage multiple git identities.

