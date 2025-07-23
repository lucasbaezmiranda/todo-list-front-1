import { useEffect, useState } from 'react';
import { fetchTodos } from '../api';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}