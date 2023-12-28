/* eslint-disable no-undef */
import React from 'react';
import Backlog from './backlog/backLog';
import Ready from './ready/ready';
import './kanbanBoard.css';
import InProgress from './inProgress/inProgress';
import Finished from './Finished/finished';

const KanbanBoard = ({ tasks, setTasks}) => {

  return (
    <div className='kanbanBoard__container'>
      <Backlog tasks={tasks} setTasks={setTasks} />
      <Ready tasks={tasks} />
      <InProgress tasks={tasks} />
      <Finished tasks={tasks} />
    </div>
  );
};

export default KanbanBoard;
