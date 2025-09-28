'use client'

import React from 'react';
import { reown } from '../reown.js';

const ConnectWalletButton = () => {
    const handleConnect = () => {
        reown.open();
    };

    return (
        <button onClick={handleConnect} className="connect-wallet-button">
            Connect Wallet
        </button>
    );
};

export default ConnectWalletButton;