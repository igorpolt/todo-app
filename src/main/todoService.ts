import fs from 'node:fs/promises';
import { Action as ActionType } from '../types/action';
import defaultToDoList from './defaultToDoList';

let cache: ActionType[]  = [];

const writeTodos = async (path: string, todos: string) => {
  await fs.writeFile(path, todos);
};

export const getTodos = async (path: string): Promise<string> => {
  try {
    await fs.stat(path);
    const todosStr = await fs.readFile(path, { encoding: 'utf8' });
    cache = [...JSON.parse(todosStr)];
    return todosStr;
  } catch (err) {
    await writeTodos(path, JSON.stringify(defaultToDoList));
    const todosStr = await fs.readFile(path, { encoding: 'utf8' });
    cache = [...JSON.parse(todosStr)];
    return todosStr;
  }
};

export const createTodo = async (path: string, action: string) => {
  const newTodos = [...cache, {id: (cache.length + 1), action, isCompleted: false}].sort((todo1, todo2) => todo1.id - todo2.id);
  cache = [...newTodos];
  const newTodosStr = JSON.stringify(newTodos);
  await writeTodos(path, newTodosStr);
  return newTodosStr;
};

export const updateTodo = async (path: string, todo: ActionType) => {
  const newTodos = [
    ...cache.filter(({ id }) => todo.id !== id),
    Object.assign(cache.find(({ id }) => id === todo.id) || {}, todo),
  ].sort((todo1, todo2) => todo1.id - todo2.id);
  cache = [...newTodos];
  const newTodosStr = JSON.stringify(newTodos);
  await writeTodos(path, newTodosStr);
  return newTodosStr;
};

export const deleteTodo = async (path: string, todo: ActionType) => {
  const newTodos = cache.filter(({ id }) => todo.id !== id).sort((todo1, todo2) => todo1.id - todo2.id);
  cache = [...newTodos];
  const newTodosStr = JSON.stringify(newTodos);
  await writeTodos(path, newTodosStr);
  return newTodosStr;
};
