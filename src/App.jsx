import { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onNewTodo={todo => setTodos(prev => [...prev, todo])} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
