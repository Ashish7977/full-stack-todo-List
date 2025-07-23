import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'; 
import Create from './Create';

function Home() {
  const [todos, setTodo] = useState([]);

  useEffect(() => {
    axios
      .get('https://todo-p9mo.onrender.com/get')
      .then((result) => {
  console.log("Data received:", result.data); // Check what this prints
  setTodo(result.data); // then fix if needed
})
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`https://todo-p9mo.onrender.com/update/${id}`)
      .then(() => {
        return axios.get('https://todo-p9mo.onrender.com/get');
      })
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://todo-p9mo.onrender.com/delete/${id}`)
      .then(() => {
        return axios.get('https://todo-p9mo.onrender.com/get');
      })
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className='parent_conatiner'>
      <Create />
      {
        todos.length === 0 ? (
          <div className='no_record'><h2>No Record</h2></div>
        ) : (
          <div className='task_container'>
            {todos.map((todo, index) => (
              <div className='task' key={index}>
                <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                  {todo.done
                    ? <BsFillCheckCircleFill className='icons' />
                    : <BsCircleFill className='icon' />}
                  <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                </div>
                <BsFillTrashFill onClick={() => handleDelete(todo._id)} />
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}

export default Home;
