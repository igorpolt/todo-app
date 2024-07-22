import { useState } from 'react';
import './index.css';
import { CREATE_TODO } from '../types/messages';

export default function CreateAction() {
  const [action, setAction] = useState<string>('');
  const addAction = () => {
    window.electron.ipcRenderer.sendMessage(CREATE_TODO, action);
  };
  return (
    <li className="action-item">
        <div className="flex items-center ps-3">
            <input name="actionInput" className="input" value={action} onChange={(e) => setAction(e.target.value)} />
            <button className="add-button" onClick={addAction}> add </button>
        </div>
    </li>
  );
}
