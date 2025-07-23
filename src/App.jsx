import { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import MathGraph from './components/MathGraph';

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <h1>Todo List v2</h1>
      <MathGraph />
      <TodoForm onNewTodo={todo => setTodos(prev => [...prev, todo])} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
