import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

import todoListAbi from './contracts/TodoList.json';
import contractAddress from './contracts/contract-address.json';

import ConnectWalletButton from './components/ConnectWalletButton';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

// const mockTasks = [
//   { id: 0, content: "Learn about smart contract testing", completed: true },
//   { id: 1, content: "Assemble React components in App.js", completed: false },
//   { id: 2, content: "Style the dApp with CSS", completed: false },
// ];

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggleCompleted = async (taskId) => {
    try {
      setError(null);
      setIsLoading(true);

      const { ethereum } = window;
      if (!ethereum) {
        alert("MetaMask is not installed!");
        setIsLoading(false);
        return;
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress.address,
        todoListAbi.abi,
        signer
      );

      console.log("Submitting transaction to toggle task...");
      const tx = await contract.toggleCompleted(taskId);

      await tx.wait();
      console.log("Transaction mined! The 'TaskCompletedToggled' event listener will now update the UI.");

    } catch (error) {
      console.error("Error toggling task status:", error);
      if (err.code === 'ACTION_REJECTED') {
        setError("Transaction rejected by user.");
      } else {
        setError("An error occurred while toggling the task.");
      }      
    } finally {
      setIsLoading(false);
    }
  };


  const fetchMyTasks = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress.address,
          todoListAbi.abi,
          provider
        );

        console.log("Fetching tasks from the blockchain...");
        const rawTasks = await contract.getMyTasks();

        const formattedTasks = rawTasks.map(task => ({
          id: Number(task.id),
          content: task.content,
          completed: task.completed,
        }));

        console.log("Tasks formatted!", formattedTasks);
        setTasks(fetchedTasks);

      } else {
        console.log("Ethereum object doesn't exist!");
      }

    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (content) => {
    try {
      setError(null);
      setIsLoading(true);

      const { ethereum } = window;
      if (!ethereum) {
        alert("MetaMask is not installed!");
        setIsLoading(false);
        return;
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress.address,
        todoListAbi.abi,
        signer
      );

      console.log("Submitting transaction to create task...");
      const tx = await contract.createTask(content);

      await tx.wait();
      onsole.log("Transaction mined! The 'TaskCreated' event listener will now update the UI.");

    } catch (error) {
      console.error("Error creating task:", error);
      if (err.code === 'ACTION_REJECTED') {
        setError("Transaction rejected by user.");
      } else {
        setError("An error occurred while creating the task.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    let contract;

    const onTaskCreated = (creator, taskId, content) => {
      console.log(`EVENT: TaskCreated received from ${creator}.`);

      if (creator.toLowerCase() === currentAccount.toLowerCase()) {
        console.log("Task is for the current user. Updating UI.");

        const newTask = {
          id: Number(taskId),
          content: content,
          completed: false,
        };

        setTasks(prevTasks => [...prevTasks, newTask]);
      }
    };

    const onTaskCompletedToggled = (user, taskId, newStatus) => {
      console.log(`EVENT: TaskCompletedToggled received for user ${user}.`);

      if (user.toLowerCase() === currentAccount.toLowerCase()) {
        console.log("Toggle event is for the current user. Updating UI.");
        setTasks(prevTasks =>
          prevTasks.map(task => {
            if (task.id === Number(taskId)) {
              return { ...task, completed: newStatus };
            } else {
              return task;
            }
          })
        );
      }
    };

    if (currentAccount) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      contract = new ethers.Contract(
        contractAddress.address,
        todoListAbi.abi,
        provider
      );

      console.log("Setting up event listeners...");
      contract.on("TaskCreated", onTaskCreated);
      contract.on("TaskCompletedToggled", onTaskCompletedToggled);
    }
    
    return () => {
      if (contract) {
        console.log("Removing event listeners...");
        contract.off("TaskCreated", onTaskCreated);
        contract.off("TaskCompletedToggled", onTaskCompletedToggled);
      }
    };    
  }, [currentAccount]);

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {

      const handleAccountsChanged = (accounts) => {
        console.log("Account changed:", accounts);

        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
        } else {
          setCurrentAccount(null);
        }
      };

      const handleChainChanged = (chainId) => {
        console.log("Network changed to:", chainId);
        window.location.reload();
      };
      
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);

      return () => {
        console.log("Removing listeners");
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("No wallet found. Consider installing MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const accounts = await provider.send("eth_accounts", []);

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.error("Error checking for wallet:", error);
    }
  };


  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Please install a wallet like MetaMask to use this dApp!");
        return;
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("Setting current account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No accounts found.");
      }


    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div className="app-container">
      {isLoading && (
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
        {!currentAccount ? (
          <ConnectWalletButton onConnect={connectWallet} />
        ) : (
          <p className="wallet-address">
            Connected: {`${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`}
          </p>
        )}
      </header>
      <main>
        <TaskForm onAddTask={handleAddTask} isLoading={isLoading} />
        <TaskList 
          tasks={tasks} 
          onToggleCompleted={handleToggleCompleted}
        />
      </main>
    </div>
  );
}

export default App;