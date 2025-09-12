# Contributing to Immutable Todo List

First off, thank you for considering contributing to Immutable Todo List! It's people like you that make this project great.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what behavior you expected**
- **Include screenshots if applicable**
- **Include your environment details** (browser, MetaMask version, network, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain the behavior you expected**
- **Explain why this enhancement would be useful**

### Pull Requests

The process described here has several goals:

- Maintain code quality
- Fix problems that are important to users
- Engage the community in working toward the best possible product
- Enable a sustainable system for maintainers to review contributions

#### Before Submitting a Pull Request

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** in a new git branch
4. **Follow the coding standards** described below
5. **Test your changes** thoroughly
6. **Run the linter**: `npm run lint`
7. **Build the project**: `npm run build`
8. **Update documentation** if necessary

#### Pull Request Guidelines

- **Fill in the required template**
- **Do not include issue numbers in the PR title**
- **Include screenshots and animated GIFs** when appropriate
- **Follow the JavaScript/React style guides**
- **Include thoughtfully-worded, well-structured tests**
- **Document new code** based on the Documentation Styleguide
- **End all files with a newline**

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension
- Access to Ethereum testnet

### Local Development

1. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/client.git
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser

### Testing

- Ensure your changes work with MetaMask
- Test on different browsers (Chrome, Firefox, Safari)
- Test wallet connection and disconnection
- Test task creation and completion toggling
- Verify blockchain interactions work correctly

## Coding Standards

### JavaScript/React Style Guide

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Use consistent indentation (2 spaces)
- Use semicolons
- Use single quotes for strings
- Use template literals for string interpolation

### Component Structure

```jsx
import React, { useState, useEffect } from 'react';

const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  const handleFunction = () => {
    // Handler logic
  };

  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

### CSS Style Guide

- Use CSS custom properties (variables) defined in `:root`
- Follow BEM naming convention for classes
- Use meaningful class names
- Group related styles together
- Add comments for complex styles

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Example: