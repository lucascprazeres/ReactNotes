import React, { Component } from 'react';
import { FaPlus, FaReact } from 'react-icons/fa';
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
        <h1>
          <FaReact />
          ReactNotes
        </h1>

        <form className="form">
          <input
            onChange={this.handleInputChange}
            type="text"
            value={newTask}
          />
          <button type="submit"><FaPlus /></button>
        </form>
      </div>
    );
  }
}

export default Main;
