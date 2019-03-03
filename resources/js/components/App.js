import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        My Todo List
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
