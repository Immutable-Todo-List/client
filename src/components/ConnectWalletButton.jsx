import React from 'react';

const ConnectWalletButton = ({ onConnect }) => {
    return (
        <button className="connect-wallet-button" onClick={onConnect}>
            Connect Wallet
        </button>
    );
};

export default ConnectWalletButton;