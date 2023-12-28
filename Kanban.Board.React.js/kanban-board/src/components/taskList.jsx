import React from 'react';
import Task from './task';
import './taskList.css';

const TaskList = ({ tasks }) => {
    console.log('tasks in TaskList:', tasks);
    return (
      <div className="task-list">
        {tasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    );
  };

export default TaskList;
