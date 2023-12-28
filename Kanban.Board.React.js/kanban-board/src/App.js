// App.js
import React, { useState } from 'react';
import Header from './components/header/header';
import KanbanBoard from './components/kanbanBoard';
import Footer from './components/footer/footer';
import './components/header/header.css';
import './components/footer/footer.css';
import './components/backlog/backLog.css';
//import './components/ready/ready.css';

const App = () => {
  // Предполагаем, что у вас есть список задач
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Card 1', description: 'Login page – performance issues', status: 'Backlog' },
    { id: 2, title: 'Card 2', description: 'Sprint bugfix', status: 'Backlog' },
    // Другие задачи...
  ]);

  const activeTasks = tasks.filter(task => task.status !== 'Finished').length;
  const finishedTasks = tasks.filter(task => task.status === 'Finished').length;

  const author = 'Your Name'; // Замените на ваше имя
  const year = new Date().getFullYear();

  return (
    <div>
      <Header />
      <main>
        <KanbanBoard tasks={tasks} setTasks={setTasks} />
      </main>
      <Footer
        activeTasks={activeTasks}
        finishedTasks={finishedTasks}
        author={author}
        year={year}
      />
    </div>
  );
};

export default App;
