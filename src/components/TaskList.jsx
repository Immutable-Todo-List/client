'use client'

import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleCompleted }) => {
    if (tasks.length === 0) {
        return <p className="task-list-empty">No tasks yet. Add one above!</p>;
    };

    return (
        <ul className="task-list">
            {tasks.map(task => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onToggleCompleted={onToggleCompleted}
                />
            ))}
        </ul>
    );
};

export default TaskList;