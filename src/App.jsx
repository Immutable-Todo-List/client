'use client'

import React, { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWatchContractEvent } from 'wagmi';
import './App.css';

import todoListAbi from './contracts/TodoList.json';
import contractAddress from './contracts/contract-address.json';
import { reown } from './reown.js';

import ConnectWalletButton from './components/ConnectWalletButton';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [error, setError] = useState(null);
  
  // Use Wagmi hooks for wallet connection
  const { address, isConnected } = useAccount();
  
  // Use Wagmi hooks for contract interactions
  const { data: tasks = [], refetch: refetchTasks } = useReadContract({
    address: contractAddress.TodoList,
    abi: todoListAbi.abi,
    functionName: 'getTasks',
    args: [address],
    enabled: !!address && isConnected,
  });

  const { 
    writeContract, 
    isPending: isWritePending 
  } = useWriteContract({
    onSuccess: () => {
      setError(null);
      refetchTasks();
    },
    onError: (error) => {
      console.error('Contract write error:', error);
      setError('Transaction failed. Please try again.');
    }
  });

  // Watch for contract events
  useWatchContractEvent({
    address: contractAddress.TodoList,
    abi: todoListAbi.abi,
    eventName: 'TaskCreated',
    onLogs: () => {
      refetchTasks();
    },
  });

  useWatchContractEvent({
    address: contractAddress.TodoList,
    abi: todoListAbi.abi,
    eventName: 'TaskCompletedToggled',
    onLogs: () => {
      refetchTasks();
    },
  });

  const handleToggleCompleted = async (taskId) => {
    try {
      setError(null);
      writeContract({
        address: contractAddress.TodoList,
        abi: todoListAbi.abi,
        functionName: 'toggleCompleted',
        args: [taskId],
      });
    } catch (error) {
      console.error('Error toggling task:', error);
      setError('Failed to toggle task completion. Please try again.');
    }
  };

  const handleAddTask = async (content) => {
    try {
      setError(null);
      writeContract({
        address: contractAddress.TodoList,
        abi: todoListAbi.abi,
        functionName: 'createTask',
        args: [content],
      });
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task. Please try again.');
    }
  };







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