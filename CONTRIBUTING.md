# Contributing to HoggerIO

Thank you for your interest in contributing to HoggerIO! This document provides guidelines and information to help you contribute effectively.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Structure](#code-structure)
- [Testing Your Changes](#testing-your-changes)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Code Style](#code-style)
- [Need Help?](#need-help)

## Getting Started

### Prerequisites

Before you begin, make sure you have:

- Node.js 20.x or higher installed
- Git installed and configured
- A Blizzard API account (free - see README.md)
- Basic knowledge of React, Next.js, and TypeScript

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub (click the "Fork" button in the top right)

2. **Clone your fork**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/ClassicArmoryIO.git
   cd ClassicArmoryIO
   ```

3. **Add the upstream remote** to sync with the main repository:

   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/ClassicArmoryIO.git
   ```

4. **Follow the setup instructions** in the [README.md](README.md#quick-start) to complete your development environment setup

## Development Workflow

### Creating a New Feature or Fix

1. **Sync your fork** with upstream:

   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create a feature branch**:

   ```bash
   git checkout -b yourGitHubName/your-feature-name
   ```

3. **Make your changes** and commit them with clear messages

4. **Keep your branch updated** (if working on a long-running feature):
   ```bash
   git pull upstream main
   # Resolve any conflicts if they occur
   ```

## Code Structure

See the [Architecture section in README.md](README.md#architecture) for an overview of the project structure.

### Where to Make Changes

Here's a quick guide to help you find the right place for your contribution:

- **UI Components & Layouts**: `app/_components/` - Modify shared components like Navbar, SearchBox, or character displays
- **Page Routes**: `app/character/`, `app/guild/`, `app/leaderboards/` - Add or modify page-level components
- **API & Data Fetching**: `app/_serverFunctions/` - Update Blizzard API calls or data fetching logic
- **Type Definitions**: `app/_types/` - Add or modify TypeScript interfaces and types
- **Utility Functions**: `app/_utils/` - Helper functions for calculations (gear score, realm utils, etc.)
- **Database Schema**: `prisma/schema.prisma` - Modify database tables and relationships
- **Item Data**: `json/` - Static data files for items, talents, etc

## Testing Your Changes

1. **UI Changes**: Smoketesting your changes in your choice browser
2. **Character Profiles**: Try loading different characters:
   ```
   http://localhost:3000/character/us/whitemane/charactername
   ```
3. **Different Game Types**: Test with Era, SoD, Cata, and MoP characters

## Submitting a Pull Request

### Before Submitting

1. **Test your changes thoroughly**
2. **Run the linter (ensure no errors)**:
   ```bash
   npm run lint
   ```
3. **Make sure the app builds**:
   ```bash
   npm run build
   ```

### Creating the Pull Request

1. **Push your branch** to your fork:

   ```bash
   git push origin yourGitHubName/your-feature-name
   ```

2. **Open a Pull Request** on GitHub:

   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill out the PR template with:
     - Description of changes
     - Screenshots (for UI changes)
     - Testing performed
     - Related issues (if applicable)

3. **PR Title Format**:
   - `[Feature] Add character comparison tool`
   - `[Fix] Resolve gear score calculation bug`
   - `[Docs] Update setup instructions`
   - `[Style] Improve mobile navigation`

### PR Review Process

- A maintainer will review your PR
- You may be asked to make changes
- Once approved, your PR will be merged!

## Code Style

### TypeScript

- Use TypeScript for all new files
- Define proper types (avoid `any` when possible)
- Use interfaces for object shapes

### Naming Conventions

- **Files**: PascalCase for components (`CharacterProfile.tsx`), camelCase for utils (`calculateGearScore.ts`)
- **Components**: PascalCase (`CharacterCard`)
- **Functions**: camelCase (`fetchProfile`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_LEVEL`)

### Code Formatting

- The project uses ESLint for code quality (run `npm run lint`)
- Format on save is recommended but not enforced
- Follow the existing code style in the file you're editing

### Commit Messages

- Use clear, descriptive commit messages
- Start with a verb in imperative mood: "Add", "Fix", "Update", "Remove"
- Examples:
  - `Add character comparison feature`
  - `Fix gear score calculation for level 60 characters`
  - `Update README with database setup instructions`

### Comments

- Add comments for complex logic
- Use JSDoc for function documentation
- Explain _why_, not just _what_

## Common Contribution Areas

### Easy First Contributions

- Fix typos in documentation
- Improve error messages

## Need Help?

- 📖 **Documentation**: Read the [README.md](README.md)
- 🐛 **Bug Reports**: Open an issue with the bug template
- ✨ **Feature Requests**: Open an issue with the feature request template

## License

By contributing to Hogger.io, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Hogger.io! 🎮
