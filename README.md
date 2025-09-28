# Immutable Todo List - Frontend Client

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF.svg)](https://vitejs.dev/)
[![Reown AppKit](https://img.shields.io/badge/Reown-AppKit-00D4FF.svg)](https://reown.com/)
[![Wagmi](https://img.shields.io/badge/Wagmi-2.x-FF6B35.svg)](https://wagmi.sh/)
[![Base](https://img.shields.io/badge/Base-Mainnet-0052FF.svg)](https://base.org/)

A decentralized todo list application built on Base blockchain, ensuring your tasks are immutable, transparent, and truly owned by you. Powered by Reown AppKit with Wagmi adapter for seamless Web3 wallet connectivity.

## 🌟 Features

- **Decentralized Storage**: Tasks are stored on Base blockchain
- **Web3-Only Authentication**: Pure wallet-based authentication (no email or social logins)
- **Universal Wallet Support**: Connect with 300+ wallets via Reown AppKit
- **Base Network**: Optimized for Base mainnet with low fees and fast transactions
- **Immutable Records**: Once created, tasks cannot be deleted or modified (only completion status can be toggled)
- **User Ownership**: Only you can view and manage your tasks
- **Real-time Updates**: Automatic UI updates when blockchain events occur using Wagmi hooks
- **Modern UI**: Clean, responsive design with dark theme
- **Cross-Platform**: Works on desktop and mobile devices
- **Type-Safe**: Built with Wagmi for robust Web3 interactions

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

### Reown AppKit + Wagmi Configuration

The app uses Reown AppKit with Wagmi adapter for robust Web3 interactions. Configuration is in `src/reown.js`:

```javascript
import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base } from '@reown/appkit/networks'

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks: [base],
  projectId,
  ssr: false
})

// Create AppKit instance
export const reown = createAppKit({
  adapters: [wagmiAdapter],
  networks: [base],
  metadata: {
    name: 'Immutable Todo List',
    description: 'Decentralized Todo List on Base',
    url: 'https://your-domain.com',
    icons: ['https://your-domain.com/icon.png']
  },
  projectId,
  features: {
    analytics: true,
    email: false, // Web3-only authentication
    socials: [], // No social media logins
    emailShowWallets: false
  }
})
```

## 📱 Usage

1. **Connect Wallet**: Click "Connect Wallet" to open Reown AppKit modal
2. **Choose Wallet**: Select from 300+ supported Web3 wallets (wallet-only authentication)
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
├── reown.js            # Reown AppKit + Wagmi configuration
├── App.jsx             # Main application component (uses Wagmi hooks)
├── App.css             # Application styles
├── main.jsx            # Application entry point with providers
└── index.css           # Global styles
```

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1, Vite 7.1.2
- **Web3 Integration**: Reown AppKit + Wagmi Adapter
- **State Management**: Wagmi hooks + React Query
- **Blockchain**: Base (Ethereum L2)
- **Styling**: CSS with CSS Variables
- **Development**: ESLint, Hot Module Replacement

## 🔗 Key Dependencies

- `@reown/appkit` - Universal wallet connectivity
- `@reown/appkit-adapter-wagmi` - Wagmi integration for AppKit
- `wagmi` - React hooks for Ethereum
- `viem` - TypeScript interface for Ethereum
- `@tanstack/react-query` - Data fetching and caching
- `react` - UI framework
- `vite` - Build tool and development server

## 🌐 Supported Networks

- **Base Mainnet** (Primary)
- Easily configurable for other EVM-compatible networks via Wagmi

## 🔐 Security Features

- **Web3-Only Authentication**: Pure wallet-based authentication, no email or social logins
- **Client-side only**: No backend servers, fully decentralized
- **Wallet verification**: All transactions require wallet signatures
- **Input validation**: Prevents malicious input
- **Error boundaries**: Graceful error handling
- **Type safety**: Wagmi provides type-safe contract interactions

## 🎯 Web3 Features

- **Real-time Contract Events**: Uses `useWatchContractEvent` for live updates
- **Optimistic Updates**: UI updates immediately with automatic rollback on errors
- **Transaction Status**: Real-time pending/success/error states
- **Account Management**: Automatic wallet connection state management
- **Network Detection**: Automatic network switching prompts

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

## 🔄 Latest Updates

### Reown AppKit + Wagmi Integration

This project now uses Reown AppKit with Wagmi adapter for enhanced Web3 functionality:

- **Enhanced Developer Experience**: Type-safe contract interactions with Wagmi hooks
- **Better Performance**: Optimized data fetching with React Query integration
- **Real-time Updates**: Live contract event listening with `useWatchContractEvent`
- **Improved Error Handling**: Comprehensive error states and user feedback
- **Web3-First Authentication**: Removed email and social media login options for pure Web3 experience

### Key Wagmi Hooks Used

- `useAccount` - Wallet connection state
- `useReadContract` - Reading contract data
- `useWriteContract` - Writing to contracts
- `useWatchContractEvent` - Real-time event listening

---

Built with ❤️ for the decentralized web
