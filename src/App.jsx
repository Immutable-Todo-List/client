import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWatchContractEvent } from 'wagmi';
import './App.css';

import todoListAbi from './contracts/TodoList.json';
import contractAddress from './contracts/contract-address.json';

import ConnectWalletButton from './components/ConnectWalletButton';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const { address, isConnected } = useAccount();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  
  const { writeContract, isPending: isWritePending } = useWriteContract();
  
  // Read tasks from contract
  const { data: rawTasks, refetch: refetchTasks } = useReadContract({
    address: contractAddress.TodoList,
    abi: todoListAbi.abi,
    functionName: 'getMyTasks',
    account: address,
  });

  const handleToggleCompleted = async (taskId) => {
    try {
      setError(null);
      
      if (!isConnected) {
        setError("Please connect your wallet first.");
        return;
      }

      console.log("Submitting transaction to toggle task...");
      writeContract({
        address: contractAddress.TodoList,
        abi: todoListAbi.abi,
        functionName: 'toggleCompleted',
        args: [taskId],
      });

    } catch (error) {
      console.error("Error toggling task status:", error);
      setError("An error occurred while toggling the task.");
    }
  };

  // Format tasks when rawTasks changes
  useEffect(() => {
    if (rawTasks) {
      const formattedTasks = rawTasks.map(task => ({
        id: Number(task.id),
        content: task.content,
        completed: task.completed,
      }));
      console.log("Tasks formatted!", formattedTasks);
      setTasks(formattedTasks);
    } else {
      setTasks([]);
    }
  }, [rawTasks]);

  const handleAddTask = async (content) => {
    try {
      setError(null);
      
      if (!isConnected) {
        setError("Please connect your wallet first.");
        return;
      }

      console.log("Submitting transaction to create task...");
      writeContract({
        address: contractAddress.TodoList,
        abi: todoListAbi.abi,
        functionName: 'createTask',
        args: [content],
      });

    } catch (error) {
      console.error("Error creating task:", error);
      setError("An error occurred while creating the task.");
    }
  };

  // Watch for TaskCreated events
  useWatchContractEvent({
    address: contractAddress.TodoList,
    abi: todoListAbi.abi,
    eventName: 'TaskCreated',
    onLogs(logs) {
      logs.forEach((log) => {
        const { creator, taskId, content } = log.args;
        console.log(`EVENT: TaskCreated received from ${creator}.`);
        
        if (creator.toLowerCase() === address?.toLowerCase()) {
          console.log("Task is for the current user. Refetching tasks.");
          refetchTasks();
        }
      });
    },
  });
  
  // Watch for TaskCompletedToggled events
  useWatchContractEvent({
    address: contractAddress.TodoList,
    abi: todoListAbi.abi,
    eventName: 'TaskCompletedToggled',
    onLogs(logs) {
      logs.forEach((log) => {
        const { user, taskId, newStatus } = log.args;
        console.log(`EVENT: TaskCompletedToggled received for user ${user}.`);
        
        if (user.toLowerCase() === address?.toLowerCase()) {
          console.log("Toggle event is for the current user. Refetching tasks.");
          refetchTasks();
        }
      });
    },
  });







  return (
    <div className="app-container">
      {isWritePending && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      {error && (
        <div className="error-popup">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <header className="app-header">
        <h1>Immutable To-Do List</h1>
        <ConnectWalletButton />
      </header>
      <main>
        <TaskForm onAddTask={handleAddTask} isLoading={isWritePending} />
        <TaskList 
          tasks={tasks} 
          onToggleCompleted={handleToggleCompleted}
        />
      </main>
    </div>
  );
}

export default App;