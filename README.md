# Immutable Todo List - Frontend Client

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF.svg)](https://vitejs.dev/)
[![Reown AppKit](https://img.shields.io/badge/Reown-AppKit-00D4FF.svg)](https://reown.com/)
[![Base](https://img.shields.io/badge/Base-Mainnet-0052FF.svg)](https://base.org/)

A decentralized todo list application built on Base blockchain, ensuring your tasks are immutable, transparent, and truly owned by you. Now powered by Reown AppKit for seamless wallet connectivity.

## 🌟 Features

- **Decentralized Storage**: Tasks are stored on Base blockchain
- **Universal Wallet Support**: Connect with 300+ wallets via Reown AppKit
- **Base Network**: Optimized for Base mainnet with low fees and fast transactions
- **Immutable Records**: Once created, tasks cannot be deleted or modified (only completion status can be toggled)
- **User Ownership**: Only you can view and manage your tasks
- **Real-time Updates**: Automatic UI updates when blockchain events occur
- **Modern UI**: Clean, responsive design with dark theme
- **Cross-Platform**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- A Web3 wallet (MetaMask, Coinbase Wallet, WalletConnect compatible wallets)
- Access to Base mainnet
- WalletConnect Project ID (get one at [WalletConnect Cloud](https://cloud.walletconnect.com/))

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

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your WalletConnect Project ID:
```env
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

4. Configure the smart contract:
   - Update `src/contracts/contract-address.json` with your deployed contract address
   - Ensure `src/contracts/TodoList.json` contains the correct ABI

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Required: WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

### Smart Contract Setup

The application requires a deployed TodoList smart contract on Base mainnet. Update the contract configuration:

```json
// src/contracts/contract-address.json
{
  "TodoList": "YOUR_CONTRACT_ADDRESS_HERE"
}
```

### Reown AppKit Configuration

The app is configured to work with Base mainnet. To modify supported networks, edit `src/reown.js`:

```javascript
import { createAppKit } from '@reown/appkit'

export const reown = createAppKit({
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  metadata: {
    name: 'Immutable Todo List',
    description: 'Decentralized Todo List on Base',
    url: 'https://your-domain.com',
    icons: ['https://your-domain.com/icon.png']
  },
  networks: [
    // Add or modify supported networks here
  ]
})
```

## 📱 Usage

1. **Connect Wallet**: Click "Connect Wallet" to open Reown AppKit modal
2. **Choose Wallet**: Select from 300+ supported wallets
3. **Switch to Base**: Ensure you're connected to Base mainnet
4. **Add Tasks**: Enter task description and click "Add Task"
5. **Toggle Completion**: Click the checkbox to mark tasks as complete/incomplete
6. **View Tasks**: All your tasks are automatically loaded from the blockchain

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── ConnectWalletButton.jsx
│   ├── TaskForm.jsx
│   ├── TaskItem.jsx
│   └── TaskList.jsx
├── contracts/           # Smart contract ABI and addresses
│   ├── TodoList.json
│   └── contract-address.json
├── reown.js            # Reown AppKit configuration
├── App.jsx             # Main application component
├── App.css             # Application styles
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1, Vite 7.1.2
- **Wallet Integration**: Reown AppKit
- **Blockchain**: Base (Ethereum L2)
- **Styling**: CSS with CSS Variables
- **Development**: ESLint, Hot Module Replacement

## 🔗 Key Dependencies

- `@reown/appkit` - Universal wallet connectivity
- `react` - UI framework
- `vite` - Build tool and development server

## 🌐 Supported Networks

- **Base Mainnet** (Primary)
- Easily configurable for other EVM-compatible networks

## 🔐 Security Features

- **Client-side only**: No backend servers, fully decentralized
- **Wallet verification**: All transactions require wallet signatures
- **Input validation**: Prevents malicious input
- **Error boundaries**: Graceful error handling

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Create an issue for bug reports or feature requests
- Check existing issues before creating new ones
- Provide detailed information for faster resolution

## 🔄 Migration from RainbowKit/Wagmi

This project has been migrated from RainbowKit/Wagmi to Reown AppKit for better wallet support and user experience. Key changes:

- **Universal Wallet Support**: 300+ wallets instead of limited selection
- **Better Mobile Experience**: Improved mobile wallet connectivity
- **Simplified Configuration**: Easier setup and maintenance
- **Future-Proof**: Built on modern Web3 standards

---

Built with ❤️ for the decentralized web
