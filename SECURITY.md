# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of our software seriously. If you believe you have found a security vulnerability in the Immutable Todo List client, please report it to us as described below.

### Where to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: [INSERT SECURITY EMAIL]

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include

Please include the requested information listed below (as much as you can provide) to help us better understand the nature and scope of the possible issue:

* Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
* Full paths of source file(s) related to the manifestation of the issue
* The location of the affected source code (tag/branch/commit or direct URL)
* Any special configuration required to reproduce the issue
* Step-by-step instructions to reproduce the issue
* Proof-of-concept or exploit code (if possible)
* Impact of the issue, including how an attacker might exploit the issue

### Blockchain-Specific Security Considerations

Given that this application interacts with Ethereum blockchain and handles wallet connections, please pay special attention to:

* **Wallet Security**: Issues related to MetaMask integration or private key handling
* **Smart Contract Interaction**: Vulnerabilities in contract calls or transaction handling
* **Frontend Security**: XSS, CSRF, or other web application vulnerabilities
* **Dependency Vulnerabilities**: Issues in npm packages, especially ethers.js
* **Network Security**: Man-in-the-middle attacks or network-based vulnerabilities

### Preferred Languages

We prefer all communications to be in English.

## Security Best Practices for Users

### Wallet Security

1. **Never share your private keys or seed phrases**
2. **Always verify contract addresses** before interacting
3. **Use hardware wallets** for significant amounts
4. **Keep MetaMask updated** to the latest version
5. **Be cautious of phishing attempts**

### Application Security

1. **Always access the application through official URLs**
2. **Verify SSL certificates** (look for the lock icon)
3. **Keep your browser updated**
4. **Use reputable antivirus software**
5. **Be cautious when connecting to unknown networks**

### Smart Contract Security

1. **Verify contract addresses** match official deployments
2. **Review transaction details** before signing
3. **Start with small amounts** when testing
4. **Understand gas fees** and set appropriate limits
5. **Monitor your transactions** on blockchain explorers

## Security Measures We Implement

### Frontend Security

- **Content Security Policy (CSP)** headers
- **Input validation and sanitization**
- **Secure communication** with HTTPS
- **Regular dependency updates**
- **Code review process** for all changes

### Blockchain Security

- **Proper error handling** for failed transactions
- **Transaction validation** before submission
- **Secure contract interaction** patterns
- **Gas limit protection** against infinite loops
- **Event verification** for state updates

### Development Security

- **Automated security scanning** in CI/CD
- **Dependency vulnerability monitoring**
- **Code quality checks** with ESLint
- **Regular security audits**
- **Secure development practices**

## Disclosure Policy

When we receive a security bug report, we will:

1. **Confirm the problem** and determine the affected versions
2. **Audit code** to find any potential similar problems
3. **Prepare fixes** for all releases still under support
4. **Release new versions** as soon as possible
5. **Announce the vulnerability** after fixes are available

## Comments on This Policy

If you have suggestions on how this process could be improved, please submit a pull request or file an issue to discuss.

## Attribution

This security policy is based on security best practices for open source projects and blockchain applications.