import React, { Component } from 'react';
import { FaReact } from 'react-icons/fa';
import Form from './Form';
import Tasks from './Tasks';

import './Main.css';

class Main extends Component {
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

        <Form
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          clearInput={this.clearInput}
          inputValue={inputValue}
        />

        <Tasks
          tasks={tasks}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default Main;
