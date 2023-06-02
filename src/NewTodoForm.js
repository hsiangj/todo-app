import React, {useState} from "react";
import {v4 as uuid} from 'uuid';

const NewTodoForm = ({addTodo}) => {
  const [task, setTask] = useState('');
  const handleChange = (e) => {
    setTask(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({task, id: uuid()});
    setTask('');
  }

  return(
    <form onSubmit={handleSubmit}>
      <label htmlFor="todo">New task: </label>
      <input
        id="todo" 
        type="text"
        name="task"
        value={task}
        onChange={handleChange}
      />
      <button>Add</button>
    </form>
  )
}

export default NewTodoForm;