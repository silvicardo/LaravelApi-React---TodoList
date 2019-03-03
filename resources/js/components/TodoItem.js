import React from 'react';

//uso uno stateless functional component
const TodoItem = (({task, onDelete}) =>(
  <li
  className="list-group-item"
  >
  <span className="mr-5">{task}</span>
  <button type="button"
    onClick={onDelete}
    className="btn btn-danger">Delete
  </button>
  </li>
));

export default TodoItem;
