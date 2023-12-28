import React from 'react';

const Footer = ({ activeTasks, finishedTasks, author, year }) => {
  return (
    <footer className="footer">
      <div className="footer__left">
        Active tasks: {activeTasks} | Finished tasks: {finishedTasks}
      </div>
      <div className="footer__right">
        Kanban board by {author}, {year}
      </div>
    </footer>
  );
};

export default Footer;
