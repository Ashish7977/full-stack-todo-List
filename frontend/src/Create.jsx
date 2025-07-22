import React, { useEffect, useState } from 'react';
import './Create.css';
import axios from 'axios';

function Create() {
  const [task, setTask] = useState();

  const handle = () => {
    axios
      .post('https://todo-p9mo.onrender.com/add', { task })
      .then((result) => location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div className='home'>
      <h1>TO DO LIST</h1>
      <div>
        <input
          type='text'
          placeholder='Add your todos'
          id='input_css'
          onChange={(e) => setTask(e.target.value)}
        />
        <button id='button_css' onClick={handle}>
          add
        </button>
      </div>
    </div>
  );
}

export default Create;
