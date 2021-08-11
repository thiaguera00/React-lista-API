import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {v4 as uuidv4} from 'uuid';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Header from './components/header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import TaskDetails from './components/TaskDetails';

import './App.css'

const App = () =>{
  const [tasks, setTasks] = useState([
    {
       id: '1',
       title: 'Estudar Programação',
       completed: false,
    },
    {
      id: '2',
      title: 'Ler Livros',
      completed: true,
    },
  ]);

  useEffect(()=>{
    const fecthTasks = async () => {
      const {data} = await axios.get(
        "https://jsonplaceholder.cypress.io/todos?_limit=10"
        );
        setTasks(data);
    };
    fecthTasks();
  }, []);

  const handleTaskClick = (taskId) =>{
      const newTasks = tasks.map(task => {
          if (task.id === taskId) return {...task, completed: ! task.completed};

          return task;
      });

      setTasks(newTasks)
  }

  const handleTaskAddtion = (taskTitle) => {
        const newTasks = [
          ...tasks, 
          {
            title: taskTitle,
            id: uuidv4(),
            completed: false,
          },
      ];
      setTasks(newTasks);
  }

  const handleTaskDeletion = (taskId) =>{
      const newTasks = tasks.filter(task => task.id !== taskId)

      setTasks(newTasks)
  }

  return(
    <Router>
    <div className="container">
      <Header />
      <Route
        path="/"
        exact
        render={() => (
          <>
            <AddTask handleTaskAddtion={handleTaskAddtion} />
            <Tasks
              tasks={tasks}
              handleTaskClick={handleTaskClick}
              handleTaskDeletion={handleTaskDeletion}
            />
          </>
        )}
      />
      <Route path="/:taskTitle" exact component={TaskDetails} />
    </div>
  </Router>
);
};


export default App;