import React, { useState } from "react";
import TaskList from "../taskList";

const Backlog = ({ tasks, setTasks }) => {
    const [ newTaskTitle, setNewTaskTitle ] = useState('');
    const [ isAddingTask, setIsAddingTask ] = useState(false);

    const backlogTasks = tasks.filter(task => task.status === 'Backlog');
    const handleTaskAdd = () => {
        if (newTaskTitle.trim() !== '') {
            //Добавляем задачу с пустым описанием 
            // eslint-disable-next-line no-unused-vars
            const newTask = { id: tasks.length + 1, title: newTaskTitle, description: "", status: 'Backlog' };
            console.log('newTask:', newTask);
            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
            setIsAddingTask(false);
        }
    };

    const handleToggleAddingTask = () => {
        setIsAddingTask(!isAddingTask);
    };
 
    return (
        <div className="backLog__container">
            <h2>Backlog</h2>
            <TaskList tasks={backlogTasks} />
            { isAddingTask ? (
                <div className="add-task">
                    <input
                        type="text"
                        placeholder={``}
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <button onClick={handleTaskAdd}>Submit</button>
                </div>
            ) : (
                <button onClick={handleToggleAddingTask}> + Add card</button>
            )}
        </div>
    );
};

export default Backlog;