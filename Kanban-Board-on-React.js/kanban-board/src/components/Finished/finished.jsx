import React, { useState } from "react";
import TaskList from "../taskList";

const Finished = ({ tasks }) => {
    const [ newTaskTitle, setNewTaskTitle ] = useState('');

    const fiishedTasks = [
        { id: 12, title: 'Card 1', description: 'Login page – performance issues', status: 'Finished' },
        { id: 13, title: 'Card 2', description: 'Sprint bugfix', status: 'Finished' },
    ]

    const handleTaskAdd = () => {
        //Добавляем задачу с пустым описанием 
        // eslint-disable-next-line no-unused-vars
        const newTask = { id: tasks.length + 1, title: newTaskTitle, description: '', status: 'Finished' };
        setNewTaskTitle('');
        //setTasks(newTask);
    }
 
    return (
        <div className="backLog__container">
            <h2>Finished</h2>
            <TaskList tasks={fiishedTasks} />
            <div className="add-task">
                <button onClick={handleTaskAdd}> + Add card</button>
            </div>
        </div>
    );
};

export default Finished;