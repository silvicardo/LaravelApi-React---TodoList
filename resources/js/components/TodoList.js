import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoEditForm from './TodoEditForm';
import * as apiCaller from './../apiCaller';

class TodoList extends Component {

  constructor(props) {

    super(props);

    this.state = {
                  todos: [],
                  isAddingNew: false
                 }

    this.manageCompletionDecoration = this.manageCompletionDecoration.bind(this);
    this.backFromForm = this.backFromForm.bind(this);
  }

  //CRUD FUNCTIONS

  componentWillMount(){
    this.getAllTodos();
  }

  async getAllTodos(){

    const apiTodos = await apiCaller.getTodos()
    const todos = apiTodos.map((todo)=>(
      {...todo, liStyle: this.manageCompletionDecoration(todo.completed)}
    ));

    this.setState({todos});

  }

  async addNewTodo(todo){

    console.log('salvataggio', todo);

    let newTodo = await apiCaller.createTodo(todo);

    this.setState({todos: [...this.state.todos, newTodo], isAddingNew: false});

  }

  async deleteTodo(id){

    await apiCaller.destroyTodo(id);

    const todos = this.state.todos.filter((todo) =>(todo.id !== id));

    this.setState({todos});

  }

  async toggleTodoCompletion(todo){

    const updatedTodo = await apiCaller.updateTodoCompletionStatus(todo);

    console.log('todo aggiornato' , updatedTodo);

    const todos = [...this.state.todos].map((todo)=>(
      updatedTodo.id == todo.id ?
      {...todo, completed: !todo.completed, liStyle: this.manageCompletionDecoration(!todo.completed)}
      :
       todo)
     );

     this.setState({todos},
       ()=>{console.log('todos after update ', this.state.todos)});

  }

  //STYLE FUNCTIONS

  manageCompletionDecoration(completed){
    console.log('todocompleted = ', completed);
      if (completed === 1 || completed === true){
        return  'line-through'
      } else if (completed === 0 || completed === false) {
        return'none'
      } else {
        console.log('todocompleted diverso da 1 o 0 ', completed);
      }
  }

  backFromForm(){
    console.log('back from form');
    this.setState({isAddingNew: false});
  }

  //RENDER METHOD
  render() {

    const {isAddingNew, todos} = this.state;

    const allTodos = todos.map((todo) => (
      <TodoItem
        key={todo.id}
        {...todo}
        itemStyle={{textDecoration: todo.liStyle}}
        onDelete={this.deleteTodo.bind(this, todo.id)}
        toggleCompletion={this.toggleTodoCompletion.bind(this, todo)}
         />
       )
    );
    return (
      [
      <button
        key="0"
        type="button"
        style={{display: !isAddingNew ? 'inline-block' : 'none'}}
        onClick={()=>{this.setState({isAddingNew : true})}}
        className="btn btn-primary my-5"
        >
        Add New Todo
      </button>
      ,
      <TodoEditForm
        key="1"
        style={{display: !isAddingNew ? 'none': 'block'}}
        onSubmit={this.addNewTodo.bind(this)}
        onBackToList={this.backFromForm}
      />
      ,
      <ul key="2" style={{display: isAddingNew ? 'none': 'block'}}
      className="text-center list-group">
        {allTodos}
      </ul>
    ]
    )
  }

  }



export default TodoList;
