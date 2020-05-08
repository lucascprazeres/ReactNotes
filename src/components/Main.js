import React, { Component } from 'react';

import './Main.css';

class Main extends Component {
  state = {
    newTask: '',
  };

  handleInputChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  }

  render() {
    const { newTask } = this.state;

    return (
      <div className="main">
        <h1>React Notes</h1>
        <h2>{newTask}</h2>
        <form>
          <input onChange={this.handleInputChange} type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Main;
