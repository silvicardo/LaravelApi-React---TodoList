import React, { Component } from 'react';

class TodoEditForm extends Component {

constructor(props){
  super(props);
  this.state = { task:'', completed:false }
  this.handleSubmit = this.handleSubmit.bind(this);
  this.showTodoList = this.showTodoList.bind(this);
}

handleSubmit(e){
  e.preventDefault();
  console.log('handleSumbmit del form');

  this.props.onSubmit({...this.state});

  this.setState({ task:'', completed:false });
}

showTodoList(e){
  e.preventDefault;

  this.props.onBackToList();
  this.setState({ task:'', completed:false });
}

render(){
  console.log('form state', this.state);
  const {onSubmit, onBackToList, style} = this.props;
  const {task} = this.state;
  console.log('task', task);

  return (
    <div className="text-center" style={style}>
      <form className="mb-3" onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label htmlFor="task">Enter a new task: </label>
        <input
          className="form-control"
          placeholder="New Todo"
          name="task"
          value={task}
          onChange={(e)=> {this.setState({[e.target.name]: e.target.value})}}/>
        </div>
        <input type="submit" className="btn btn-success" value="Submit Todo"/>
      </form>
      <button onClick={this.showTodoList} className="btn btn-warning">Go back</button>
    </div>
  )
}

}

export default TodoEditForm;
