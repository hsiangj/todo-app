import React, {useState} from 'react';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const add = (newTodo) => {
    setTodos(todos => [...todos, newTodo]);
  } 

  const edit = (id, editedTask) => {
    setTodos(todos => todos.map( todo =>
      todo.id === id
      ? {...todo, task: editedTask}
      : todo
    ))
  } 

  const remove = (id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }

  const todoComponent = todos.map(todo => {
    return (
      <Todo 
      id={todo.id}
      key={todo.id}
      task={todo.task}
      remove={remove}
      edit={edit}
      />
  )})

  return (
    <div>
      <h1>Todo</h1>
      <NewTodoForm addTodo={add}/>
      <ul>{todoComponent}</ul>
    </div>
    
  )
}


export default TodoList;