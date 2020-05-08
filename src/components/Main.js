import React, { Component } from 'react';
import {
  FaPlus, FaReact, FaEdit, FaWindowClose,
} from 'react-icons/fa';

import './Main.css';
import './Main.form.css';
import './Main.ul.css';

class Main extends Component {
  static formatAndReturnTask(task) {
    return task.split(' ').join('-').toLowerCase();
  }

  state = {
    newTask: '',
    tasks: ['To Study English', 'To do yoga', 'To code'],
  };

  handleInputChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  }

  render() {
    const { newTask, tasks } = this.state;

    return (
      <div className="main">
        <h1>
          <FaReact className="react-icon" />
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

        <ul className="tasks">
          {tasks.map((task) => (
            <li key={Main.formatAndReturnTask(task)}>
              {task}
              <div>
                <FaEdit className="edit-icon" />
                <FaWindowClose className="delete-icon" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Main;
