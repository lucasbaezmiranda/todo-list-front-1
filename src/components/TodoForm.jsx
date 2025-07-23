import { useState } from 'react';
import { createTodo } from '../api';

export default function TodoForm({ onNewTodo }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = await createTodo(title);
    onNewTodo(newTodo);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button type="submit">Agregar</button>
    </form>
  );
}