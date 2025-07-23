import { useEffect, useState } from 'react';
import { fetchTodos } from '../api';

export default function TodoList({ todos, setTodos }) {
  useEffect(() => {
    fetchTodos().then(setTodos);
  }, [setTodos]);

  // Eliminar tarea
  const deleteTodo = async (id) => {
    await fetch(`https://api.lukebm.com/todos/${id}`, {
      method: "DELETE"
    });
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // Editar tarea
  const updateTodo = async (id, newText) => {
    const res = await fetch(`https://api.lukebm.com/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newText })
    });
    const updated = await res.json();
    setTodos(prev => prev.map(todo => todo.id === id ? updated : todo));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <EditableText
            text={todo.title}
            onSave={newText => updateTodo(todo.id, newText)}
          />
          <button onClick={() => deleteTodo(todo.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

function EditableText({ text, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(text);

  const save = () => {
    setEditing(false);
    if (draft !== text) onSave(draft);
  };

  return editing ? (
    <input
      value={draft}
      onChange={e => setDraft(e.target.value)}
      onBlur={save}
      onKeyDown={e => e.key === "Enter" && save()}
      autoFocus
    />
  ) : (
    <span onClick={() => setEditing(true)} style={{ marginRight: 8, cursor: "pointer" }}>
      {text}
    </span>
  );
}
