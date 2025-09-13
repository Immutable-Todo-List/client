import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  sepolia,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Immutable Todo List',
  projectId: import.meta.env.WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID', // Get this from https://cloud.walletconnect.com
  chains: [
    mainnet,
    optimism,
    arbitrum,
    base,
    ...(import.meta.env.DEV ? [sepolia] : []),
  ],
  ssr: false, // If your dApp uses server side rendering (SSR)
});