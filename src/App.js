// import React,{useState} from 'React';
import React, { useState } from 'react';
import TodoAdd from './components/TodoAdd/TodoAdd';
import TodoItem from './components/TodoItem/TodoItem';
import styles from './App.module.scss';



export const generateId = () => (
  Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
)

const App = () => {

  const [tasks, setTask] = useState([]);

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>TODO LIST APPLICATION</h1>
      <section className={styles.articleSection}>
        <TodoAdd
          onAdd={(title) => {
            if(!title){
              return;
            }
            setTask([
              {
                id: generateId(),
                title
              },
              ...tasks
            ])
          }} />
      </section>
      <section className={styles.articleSection}>
        {
          tasks.length <= 0 && (
            <p className={styles.articleText}>There is no more what to do </p>
          )
        }
        {
          tasks.map(task => (
            <TodoItem
              key={task.id}
              title={task.title}
              id={task.id}
              onDone={(id) => {
                setTask(tasks.filter(task => task.id !== id))
              }}
              onRemove={(id) => {
                setTask(tasks.filter(task => task.id !== id))
              }}
              onEditMode={(id,value) => {
                setTask(tasks.map(task => task.id === id ? {
                  ...task,
                  title: value
                }: task))
              }}
            />
          ))
        }
      </section>
    </article>
  )
}

export default App;
