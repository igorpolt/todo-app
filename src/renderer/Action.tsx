import { UPDATE_TODO, DELETE_TODO } from '../types/messages';

export default function Action({ todo }) {
  const { action, isCompleted } = todo;
  return (
    <li className="action-item">
        <div className="flex items-center ps-3">
            <input
            id="checkbox"
            type="checkbox"
            checked={isCompleted}
            onChange={() => {
              window.electron.ipcRenderer.sendMessage(UPDATE_TODO, {...todo, isCompleted: !isCompleted});
            }}
            className="completion-check" />
            <label className={"action " + (isCompleted ? "done" : null)}>{action}</label>
            <button className="delete-button" onClick={() => {
              window.electron.ipcRenderer.sendMessage(DELETE_TODO, todo);
            }}> delete </button>
        </div>
    </li>
  );
}
