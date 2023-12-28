import React, { useState } from "react";
import TaskList from "../taskList";

const InProgress = ({ tasks }) => {
    const [ newTaskTitle, setNewTaskTitle ] = useState('');

    const inProgressTasks = [
        { id: 12, title: 'Card 1', description: 'Login page – performance issues', status: 'inProgress' },
        { id: 13, title: 'Card 2', description: 'Sprint bugfix', status: 'inProgress' },
    ]

    const handleTaskAdd = () => {
        //Добавляем задачу с пустым описанием 
        // eslint-disable-next-line no-unused-vars
        const newTask = { id: tasks.length + 1, title: newTaskTitle, description: '', status: 'inProgress' };
        setNewTaskTitle('');
        //setTasks(newTask);
    }
 
    return (
        <div className="backLog__container">
            <h2>In Progress</h2>
            <TaskList tasks={inProgressTasks} />
            <div className="add-task">
                <button onClick={handleTaskAdd}> + Add card</button>
            </div>
        </div>
    );
};

export default InProgress;