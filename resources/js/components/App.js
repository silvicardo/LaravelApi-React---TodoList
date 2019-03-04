import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';

class App extends Component {
  render() {
    return (
      <div className="App d-flex flex-column align-items-center">
        <h1 className="my-5">Single Page TodoList App</h1>
        <TodoList />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
