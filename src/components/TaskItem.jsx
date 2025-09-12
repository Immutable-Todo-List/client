import React from 'react';

const TaskItem = ({ task, onToggleCompleted }) => {
    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-item-container">
                <input
                 type="checkbox"
                 checked={task.completed}
                 onChange={() => onToggleCompleted(task.id)}
                />
                <span className="task-content">{task.content}</span>
            </div>
        </li>
    );
};

export default TaskItem;