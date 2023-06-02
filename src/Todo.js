import React, {useState} from 'react';

const Todo = ({id, task, remove, edit }) => {
  const [editTask, setEditTask] = useState(task);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }

  const handleChange = (e) => {
    setEditTask(e.target.value);
  }

  const handleEdit = (e) => {
    e.preventDefault();
    edit(id, editTask);
    setIsEditing(false);
  }

  let jsx = (
    <li>
      {task}
      &nbsp;
      <button onClick={toggleEdit}>Edit</button>
      <button onClick={()=>remove(id)}>X</button>
    </li>
  )

  if(isEditing){
    jsx = (
      <form onSubmit={handleEdit}>
        <input type="text" value={editTask} onChange={handleChange}/>
        <button>Save</button>
      </form>
    )
  }


  return jsx;
}

export default Todo;