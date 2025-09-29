"use client"

import { useState } from "react"
import { useAccount, useReadContract, useWriteContract, useWatchContractEvent } from 'wagmi'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Wallet, Plus, CheckCircle2, Target, TrendingUp, Moon, Sun, Menu, X } from 'lucide-react'

import todoListAbi from './contracts/TodoList.json'
import contractAddress from './contracts/contract-address.json'
import { reown } from './reown.js'

export default function ImmutableTodoList() {
  // State Management
  const [newTask, setNewTask] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [error, setError] = useState(null)

  // Wagmi hooks for wallet connection
  const { address, isConnected } = useAccount()

  // Contract read hook - using getMyTasks function
  const { data: tasks = [], refetch: refetchTasks } = useReadContract({
    address: contractAddress.TodoList,
    abi: todoListAbi.abi,
    functionName: 'getMyTasks',
    enabled: !!address && isConnected,
  })

  // Contract write hook
  const { 
    writeContract, 
    isPending: isWritePending 
  } = useWriteContract({
    onSuccess: () => {
      setError(null)
      refetchTasks()
    },
    onError: (error) => {
      console.error('Contract write error:', error)
      setError('Transaction failed. Please try again.')
    }
  })

  // Watch for contract events
  useWatchContractEvent({
    address: contractAddress.TodoList,
    abi: todoListAbi.abi,
    eventName: 'TaskCreated',
    onLogs: () => {
      refetchTasks()
    },
  })

  useWatchContractEvent({
    address: contractAddress.TodoList,
    abi: todoListAbi.abi,
    eventName: 'TaskCompletedToggled',
    onLogs: () => {
      refetchTasks()
    },
  })

  // Functions
  const addTask = () => {
    if (newTask.trim() && isConnected) {
      try {
        setError(null)
        writeContract({
          address: contractAddress.TodoList,
          abi: todoListAbi.abi,
          functionName: 'createTask',
          args: [newTask.trim()],
        })
        setNewTask("")
      } catch (error) {
        console.error('Error creating task:', error)
        setError('Failed to create task. Please try again.')
      }
    }
  }

  const toggleTask = (id) => {
    if (isConnected) {
      try {
        setError(null)
        writeContract({
          address: contractAddress.TodoList,
          abi: todoListAbi.abi,
          functionName: 'toggleCompleted',
          args: [id],
        })
      } catch (error) {
        console.error('Error toggling task:', error)
        setError('Failed to toggle task completion. Please try again.')
      }
    }
  }

  const deleteTask = (id) => {
    // Note: The current contract doesn't have a delete function
    // This is a placeholder for future implementation
    console.log('Delete functionality not implemented in contract')
  }

  const connectWallet = () => {
    reown.open()
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Progress Calculations
  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header Section */}
      <header
        className={`border-b shadow-sm transition-colors duration-300 ${
          isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1
                  className={`text-3xl md:text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Immutable To-Do
                </h1>
                <p className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Blockchain Task Management
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              {/* Wallet Connection Button */}
              {isConnected ? (
                <Button
                  onClick={connectWallet}
                  className="flex items-center gap-2 px-6 py-2.5 font-semibold transition-all duration-200 bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Connected</span>
                </Button>
              ) : (
                <Button
                  onClick={connectWallet}
                  className="flex items-center gap-2 px-6 py-2.5 font-semibold transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button
                onClick={toggleMobileMenu}
                variant="ghost"
                size="sm"
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-3">
                <Button
                  onClick={toggleTheme}
                  variant="ghost"
                  className={`flex items-center justify-start gap-3 w-full p-3 rounded-lg transition-all duration-200 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
                </Button>

                {isConnected ? (
                  <Button
                    onClick={connectWallet}
                    className="flex items-center justify-start gap-3 w-full p-3 font-semibold transition-all duration-200 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>Wallet Connected</span>
                  </Button>
                ) : (
                  <Button
                    onClick={connectWallet}
                    className="flex items-center justify-start gap-3 w-full p-3 font-semibold transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>Connect Wallet</span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-6">
        {isConnected ? (
          <>
            {/* Progress Overview Card */}
            <div
              className={`rounded-lg shadow transition-colors duration-300 ${
                isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
              }`}
            >
              <div className="py-2 px-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-gray-900"}`} />
                    <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Progress Overview</h2>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{Math.round(progressPercentage)}%</div>
                    <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Complete</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`flex justify-between text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    <span>Tasks Completed</span>
                    <span>
                      {completedTasks} of {totalTasks}
                    </span>
                  </div>
                  <div className={`w-full rounded-full h-3 overflow-hidden ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                    <div
                      className="bg-emerald-600 h-3 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Add Task Form */}
            <Card
              className={`shadow border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <CardContent className="py-2 px-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="What needs to be done?"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTask()}
                    className={`flex-1 h-12 border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                    }`}
                  />
                  <Button
                    onClick={addTask}
                    className="w-full sm:w-auto px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 font-semibold"
                    disabled={!newTask.trim() || isWritePending}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    {isWritePending ? 'Adding...' : 'Add Task'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Task List */}
            <div className="space-y-6">
              {tasks.map((task, index) => (
                <Card
                  key={task.id}
                  className={`transition-all duration-300 shadow border ${
                    task.completed
                      ? isDarkMode
                        ? "bg-emerald-900/20 border-emerald-700"
                        : "bg-emerald-50 border-emerald-200"
                      : isDarkMode
                        ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <CardContent className="py-2 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className={`w-4 h-4 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 border-2 rounded ${
                            isDarkMode ? "border-gray-500" : "border-gray-300"
                          }`}
                          disabled={isWritePending}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className={`text-balance text-sm font-medium leading-relaxed transition-all duration-200 ${
                            task.completed
                              ? isDarkMode
                                ? "line-through text-emerald-400/70"
                                : "line-through text-emerald-700/70"
                              : isDarkMode
                                ? "text-white"
                                : "text-gray-900"
                          }`}
                        >
                          {task.content}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                        className={`rounded-md p-1.5 transition-all duration-200 ${
                          isDarkMode
                            ? "text-gray-500 hover:text-red-400 hover:bg-red-900/20"
                            : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                        }`}
                        disabled={true} // Disabled since contract doesn't support delete
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {tasks.length === 0 && (
              <Card
                className={`shadow border transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <CardContent className="py-2 px-4 text-center">
                  <div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6 ${
                      isDarkMode
                        ? "bg-blue-900/50"
                        : "bg-blue-100"
                    }`}
                  >
                    <CheckCircle2 className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Ready to get started?
              </h3>
                  <p className={`max-w-md mx-auto leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Create your first immutable task and begin building your blockchain-powered productivity system.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          /* Connect Wallet Prompt */
          <Card
            className={`shadow border transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <CardContent className="py-2 px-4 text-center">
              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6 ${
                  isDarkMode
                    ? "bg-blue-900/50"
                    : "bg-blue-100"
                }`}
              >
                <Wallet className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Connect Your Wallet
              </h3>
              <p className={`max-w-md mx-auto leading-relaxed mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Connect your wallet to start managing your tasks on the blockchain. Your data will be stored securely and immutably.
              </p>
              <Button
                onClick={connectWallet}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Loading overlay */}
      {isWritePending && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-8 shadow ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Processing transaction...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error popup */}
      {error && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg p-6 shadow max-w-md w-full ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Error
            </h3>
            <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {error}
            </p>
            <Button
              onClick={() => setError(null)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}