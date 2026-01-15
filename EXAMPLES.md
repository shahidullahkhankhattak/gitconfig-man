# gitconfig-man Examples

This document provides practical examples of using gitconfig-man in different scenarios.

## Quick Start

### Installation and Initialization

```bash
# Install globally
npm install -g gitconfig-man

# Initialize (saves your current git config as 'default' profile)
gitconfig-man -i
```

## Example 1: Personal and Work Profiles

### Setup

```bash
# Initialize with current config as default
gitconfig-man -i

# Create work profile
gitconfig-man -c work

# Configure work settings
git config --global user.name "John Doe"
git config --global user.email "john.doe@company.com"
git config --global core.editor "code"

# Create personal profile
gitconfig-man -c personal

# Configure personal settings
git config --global user.name "John"
git config --global user.email "john@personal.com"
git config --global core.editor "vim"
```

### Daily Usage

```bash
# Switch to work profile
gitconfig-man -s work

# Work on company projects...
git clone git@github.com:company/project.git
cd project
git commit -m "Work commit"  # Uses work email

# Switch to personal profile
gitconfig-man -s personal

# Work on personal projects...
git clone git@github.com:john/personal-project.git
cd personal-project
git commit -m "Personal commit"  # Uses personal email
```

## Example 2: Multiple Client Projects

```bash
# Client A configuration
gitconfig-man -c client-a
git config --global user.name "Your Name"
git config --global user.email "you@clienta.com"
git config --global commit.gpgsign true

# Client B configuration
gitconfig-man -c client-b
git config --global user.name "Your Name"
git config --global user.email "you@clientb.com"
git config --global commit.gpgsign false

# Switch between clients
gitconfig-man -s client-a  # When working on Client A projects
gitconfig-man -s client-b  # When working on Client B projects
```

## Example 3: Different Development Environments

```bash
# Production-like config
gitconfig-man -c production
git config --global core.autocrlf false
git config --global core.editor "nano"
git config --global pull.rebase true

# Development config
gitconfig-man -c development
git config --global core.autocrlf true
git config --global core.editor "code --wait"
git config --global pull.rebase false
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
```

## Example 4: Open Source vs Private Projects

```bash
# Open source profile
gitconfig-man -c opensource
git config --global user.name "Your Public Name"
git config --global user.email "public@email.com"
git config --global commit.gpgsign true
git config --global user.signingkey ABC123DEF

# Private/Corporate profile
gitconfig-man -c corporate
git config --global user.name "Your Corporate Name"
git config --global user.email "name@company.com"
git config --global commit.gpgsign false
git config --global http.sslVerify true
git config --global http.proxy http://corporate-proxy:8080
```

## Example 5: Interactive Mode

### Create Profile Interactively

```bash
gitconfig-man -c
# ? Enter name for the new profile: staging
# ✓ Saved current git config to 'work' profile
# ✓ Created new profile: staging
# ? Do you want to switch to newly created profile (staging)? Yes
```

### Switch Profile Interactively

```bash
gitconfig-man -s
# ? Select profile to switch to: (Use arrow keys or type to search)
# ❯ default
#   work
#   personal
#   staging
```

### Delete Profile Interactively

```bash
gitconfig-man -d
# ? Select profile to delete: (Use arrow keys or type to search)
# ❯ staging
#   testing
# ? Are you sure you want to delete profile 'staging'? Yes
# ✓ Successfully deleted profile 'staging'
```

## Example 6: List All Profiles

```bash
gitconfig-man -ls

# Available profiles:
#   • default
#   ✓ work (active)
#   • personal
#   • client-a
#   • client-b
```

## Example 7: Complex Git Configuration

```bash
# Create a profile with extensive configuration
gitconfig-man -c advanced

# User settings
git config --global user.name "Developer Name"
git config --global user.email "dev@example.com"

# Core settings
git config --global core.editor "vim"
git config --global core.autocrlf input
git config --global core.whitespace trailing-space,space-before-tab

# Color settings
git config --global color.ui true
git config --global color.status auto
git config --global color.branch auto

# Aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# Merge and diff tools
git config --global merge.tool vimdiff
git config --global diff.tool vimdiff

# Push settings
git config --global push.default simple

# Pull settings
git config --global pull.rebase true
```

## Tips and Tricks

### Verify Current Configuration

After switching profiles, verify your settings:

```bash
gitconfig-man -s work
git config --global --list
```

### Backup Profiles

The profiles are stored as JSON files in `~/.gitconfigman/`. You can backup this directory:

```bash
cp -r ~/.gitconfigman ~/gitconfig-backup
```

### Restore from Backup

```bash
cp -r ~/gitconfig-backup ~/.gitconfigman
```

### Reset to Default

```bash
gitconfig-man -s default
```

### View Specific Settings

```bash
git config --global user.name
git config --global user.email
```

## Troubleshooting

### Check Active Profile

```bash
gitconfig-man -ls
```

The active profile is marked with ✓

### Verify Git Config Location

```bash
git config --list --show-origin
```

This shows where each setting is coming from.

### Manual Profile Editing

Profiles are stored in `~/.gitconfigman/` as JSON files. You can edit them manually if needed:

```bash
cat ~/.gitconfigman/work.json
```

---

For more information, see the [README.md](README.md) or run `gitconfig-man -h`.

