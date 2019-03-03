import React, { Component } from 'react';
import TodoItem from './TodoItem';
import * as apiCaller from './../apiCaller';

class TodoList extends Component {

  constructor(props) {

    super(props);

    this.state = { todos: [] }
  }

  componentWillMount(){
    this.getAllTodos();
  }

  async getAllTodos(){

    const todos = await apiCaller.getTodos();

    this.setState({todos});

  }

  async deleteTodo(id){

    await apiCaller.destroyTodo(id);

    const todos = this.state.todos.filter((todo) =>(todo.id !== id));

    this.setState({todos});

  }

  render() {

    const todos = this.state.todos.map((todo) => (<TodoItem key={todo.id} {...todo} onDelete={this.deleteTodo.bind(this, todo.id)} />));
    console.log(todos);
    return (
      <ul className="text-center list-group">
        {todos}
      </ul>
    )
  }


  }



export default TodoList;
