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
    inputValue: '',
    tasks: [],
    clearInput: false,
    index: -1,
  };

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    if (!tasks) return;

    this.setState({ tasks });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;

    if (tasks === prevState.tasks) return;

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { index } = this.state;
    if (index === -1) {
      return this.createTaskFromInput();
    }
    this.reinsertTask();
  }

  handleEdit = (e, index) => {
    const { tasks } = this.state;

    const selectedTask = tasks.splice(index, 1).pop();

    this.setState({ inputValue: selectedTask, index });
  }

  handleDelete = (e, index) => {
    const { tasks } = this.state;
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    this.setState({ tasks: updatedTasks });
  }

  createTaskFromInput = () => {
    const { tasks } = this.state;
    let { inputValue } = this.state;
    inputValue = inputValue.trim();

    if (tasks.indexOf(inputValue) !== -1) {
      this.setState({
        inputValue: 'This task is already saved!',
        clearInput: true,
      });
      return;
    }
    const updatedTasks = [...tasks, inputValue];
    this.setState({
      tasks: updatedTasks,
      inputValue: '',
    });
  }

  reinsertTask = () => {
    const { index, inputValue, tasks } = this.state;

    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 0, inputValue);
    this.setState({ tasks: updatedTasks, index: -1 });
  }

  clearInput = () => {
    const { clearInput } = this.state;
    if (clearInput) {
      this.setState({
        inputValue: '',
        clearInput: false,
      });
    }
  }

  render() {
    const { inputValue, tasks } = this.state;

    return (
      <div className="main">
        <h1>
          <FaReact className="react-icon" />
          ReactNotes
        </h1>

        <form className="form" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleInputChange}
            onFocus={this.clearInput}
            type="text"
            value={inputValue}
          />
          <button type="submit"><FaPlus /></button>
        </form>

        <ul className="tasks">
          {tasks.map((task, index) => (
            <li key={Main.formatAndReturnTask(task)}>
              {task}
              <span>
                <FaEdit
                  className="edit-icon"
                  onClick={(e) => this.handleEdit(e, index)}
                />
                <FaWindowClose
                  className="delete-icon"
                  onClick={(e) => this.handleDelete(e, index)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Main;
