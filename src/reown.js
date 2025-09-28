'use client'

import { createAppKit } from '@reown/appkit'
import { base } from '@reown/appkit/networks'

// Get project ID from environment variables
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID'

// App metadata
const metadata = {
  name: 'Immutable Todo List',
  description: 'A decentralized todo list application built on blockchain',
  url: 'https://immutable-todo.app', // Replace with your actual URL
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create and configure the AppKit instance
export const reown = createAppKit({
  adapters: [], // Will be configured based on your needs
  networks: [base], // Base mainnet
  metadata,
  projectId,
  features: {
    analytics: true, // Optional: Enable analytics
  }
})

export default reown