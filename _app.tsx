'use client'

import React from 'react'
import { reown } from './src/reown.js'

// ReownProvider component to wrap the app
interface ReownProviderProps {
  appKit: any
  children: React.ReactNode
}

export const ReownProvider: React.FC<ReownProviderProps> = ({ appKit, children }) => {
  return (
    <div data-reown-provider="true">
      {children}
    </div>
  )
}

// App wrapper component
interface AppProps {
  Component: React.ComponentType<any>
  pageProps: any
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReownProvider appKit={reown}>
      <Component {...pageProps} />
    </ReownProvider>
  )
}