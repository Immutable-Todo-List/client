# Immutable Todo List - Frontend Client

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF.svg)](https://vitejs.dev/)
[![Ethereum](https://img.shields.io/badge/Ethereum-Smart%20Contract-627EEA.svg)](https://ethereum.org/)

A decentralized todo list application built on Ethereum blockchain, ensuring your tasks are immutable, transparent, and truly owned by you.

## 🌟 Features

- **Decentralized Storage**: Tasks are stored on Ethereum blockchain
- **Wallet Integration**: Connect with MetaMask wallet
- **Immutable Records**: Once created, tasks cannot be deleted or modified (only completion status can be toggled)
- **User Ownership**: Only you can view and manage your tasks
- **Real-time Updates**: Automatic UI updates when blockchain events occur
- **Modern UI**: Clean, responsive design with dark theme

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MetaMask browser extension
- Access to Ethereum testnet (Sepolia recommended) or mainnet

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Immutable-Todo-List/client.git
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Configure the smart contract:
   - Update `src/contracts/contract-address.json` with your deployed contract address
   - Ensure `src/contracts/TodoList.json` contains the correct ABI

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

### Smart Contract Setup

The application requires a deployed TodoList smart contract. Update the contract configuration:

```json
// src/contracts/contract-address.json
{
  "TodoList": "YOUR_CONTRACT_ADDRESS_HERE"
}
```

### Network Configuration

Ensure your MetaMask is connected to the same network where your smart contract is deployed.

## 📱 Usage

1. **Connect Wallet**: Click "Connect Wallet" to connect your MetaMask
2. **Add Tasks**: Enter task description and click "Add Task"
3. **Toggle Completion**: Click the checkbox to mark tasks as complete/incomplete
4. **View Tasks**: All your tasks are automatically loaded from the blockchain

## 🏗️ Project Structure
