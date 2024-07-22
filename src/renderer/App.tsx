import { useEffect, useState } from 'react';
import Action from './Action';
import CreateAction from './CreateAction';
import { GET_TODOS } from '../types/messages';
import { Action as ActionType } from '../types/action';
import './index.css';

export default function App() {
  const [todos, setTodos] = useState<ActionType[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage(GET_TODOS);
    window.electron.ipcRenderer.on(GET_TODOS, (todos) => {
      console.log(todos);
      setTodos(JSON.parse(todos));
    });
  }, []);

  return (
    <div className="todo-container">
      <h1 className="header">
        To Do List:
      </h1>
      <ul className="todo-list">
        {
          todos.map((todo) => <Action key={todo.id} todo={todo} />)
        }
        <CreateAction />
      </ul>
    </div>
  );
}
