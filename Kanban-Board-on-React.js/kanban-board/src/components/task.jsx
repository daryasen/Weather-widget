import React from 'react';
import './task.css';

const Task = ({ task }) => {
  console.log('task in Task:', task);
  return (
    <div className='task'>
      <p>{task.description}</p>
    </div>
  );
};

export default Task;
