'use client'

import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { base } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'

// Get project ID from environment variables
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID'

// App metadata
const metadata = {
  name: 'Immutable Todo List',
  description: 'A decentralized todo list application built on blockchain',
  url: 'https://immutable-todo.app', // Replace with your actual URL
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Set up the networks
const networks = [base]

// Create QueryClient for React Query
export const queryClient = new QueryClient()

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false // Set to true if using SSR
})

// Create and configure the AppKit instance
export const reown = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true,
    email: false, // Disable email login
    socials: [], // Disable all social media logins
    emailShowWallets: false, // Don't show wallet options in email flow
  }
})

export default reown