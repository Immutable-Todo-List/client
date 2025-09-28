'use client'

import React, { useState } from 'react';

const TaskForm = ({ onAddTask, isLoading }) => {
    const [inputValue, setInputValue] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') {
            alert("Task content cannot be empty!");
            return;
        }

        onAddTask(inputValue);
        setInputValue('');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="task-input"
                placeholder="Add a new task..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Add Task'}
            </button>
        </form>
    );
};

export default TaskForm;