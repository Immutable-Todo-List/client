'use client'

import React, { useState, useEffect } from 'react';
import './App.css';

import todoListAbi from './contracts/TodoList.json';
import contractAddress from './contracts/contract-address.json';
import { reown } from './reown.js';

import ConnectWalletButton from './components/ConnectWalletButton';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [address, setAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isWritePending, setIsWritePending] = useState(false);

  // Listen for wallet connection changes
  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (reown && reown.getAccount) {
          const account = reown.getAccount();
          if (account && account.address) {
            setAddress(account.address);
            setIsConnected(true);
            await fetchTasks(account.address);
          } else {
            setAddress(null);
            setIsConnected(false);
            setTasks([]);
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
        setAddress(null);
        setIsConnected(false);
        setTasks([]);
      }
    };

    checkConnection();
    
    // Set up event listeners for wallet state changes
    if (reown && reown.subscribeAccount) {
      const unsubscribe = reown.subscribeAccount((account) => {
        if (account && account.address) {
          setAddress(account.address);
          setIsConnected(true);
          fetchTasks(account.address);
        } else {
          setAddress(null);
          setIsConnected(false);
          setTasks([]);
        }
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, []);

  // Fetch tasks from contract
  const fetchTasks = async (userAddress) => {
    try {
      // This would need to be implemented with a proper Web3 provider
      // For now, we'll use a placeholder
      console.log('Fetching tasks for address:', userAddress);
      // TODO: Implement contract reading with ethers or web3.js
      setTasks([]);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    }
  };

  const handleToggleCompleted = async (taskId) => {
    try {
      setError(null);
      setIsWritePending(true);
      
      // TODO: Implement contract writing with ethers or web3.js
      console.log('Toggling task completion for task ID:', taskId);
      
      // Placeholder - would need proper Web3 provider integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsWritePending(false);
    } catch (error) {
      console.error('Error toggling task:', error);
      setError('Failed to toggle task completion. Please try again.');
      setIsWritePending(false);
    }
  };

  const handleAddTask = async (content) => {
    try {
      setError(null);
      setIsWritePending(true);
      
      // TODO: Implement contract writing with ethers or web3.js
      console.log('Creating new task with content:', content);
      
      // Placeholder - would need proper Web3 provider integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsWritePending(false);
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task. Please try again.');
      setIsWritePending(false);
    }
  };

  // TODO: Implement contract event listening with ethers or web3.js
  // This would replace the useWatchContractEvent hooks from Wagmi







  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Immutable Todo List</h1>
        <ConnectWalletButton />
        {isConnected && address && (
          <div className="wallet-info">
            <p>Connected on Base Mainnet</p>
            <p className="wallet-address">Address: {address}</p>
          </div>
        )}
      </header>

      <main className="main-content">
        {isConnected ? (
          <>
            <TaskForm onAddTask={handleAddTask} isLoading={isWritePending} />
            <TaskList 
              tasks={tasks} 
              onToggleCompleted={handleToggleCompleted}
            />
          </>
        ) : (
          <div className="connect-prompt">
            <p>Please connect your wallet to view and manage your tasks.</p>
          </div>
        )}
      </main>

      {/* Loading overlay */}
      {isWritePending && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Processing transaction...</p>
        </div>
      )}

      {/* Error popup */}
      {error && (
        <div className="error-popup">
          <div className="error-content">
            <h3>Error</h3>
            <p>{error}</p>
            <button onClick={() => setError(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;