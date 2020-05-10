import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaWindowClose } from 'react-icons/fa';

import './Tasks.css';

export default function Tasks({ tasks, handleEdit, handleDelete }) {
  const formatAndReturnTask = (task) => task.split(' ').join('-').toLowerCase();

  return (
    <ul className="tasks">
      {tasks.map((task, index) => (
        <li key={formatAndReturnTask(task)}>
          {task}
          <span>
            <FaEdit
              className="edit-icon"
              onClick={(e) => handleEdit(e, index)}
            />
            <FaWindowClose
              className="delete-icon"
              onClick={(e) => handleDelete(e, index)}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  handleEdit: PropTypes.string.isRequired,
  handleDelete: PropTypes.string.isRequired,
};
