import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'; 

import Create from './Create'

function Home() {
    const [todos,settodo] = useState([])


 useEffect(()=>{
    axios.get('http://localhost:3000/get').then((result)=>settodo(result.data)).catch((err)=>console.log(err))
 },[])    
 
const handleEdit = (id) => {
  axios.put(`http://localhost:3000/update/${id}`)
    .then(() => {
      // Re-fetch todos to get updated data
      return axios.get('http://localhost:3000/get');
    })
    .then((res) => settodo(res.data)).
    them((result)=>location.reload())
    .catch((err) => console.log(err));
};

const handledelete = (id) =>{
    axios.delete(`http://localhost:3000/delete/${id}`)
    .then(() => {
      // Re-fetch todos to get updated data
      return axios.get('http://localhost:3000/get');
    })
    .then((res) => settodo(res.data)).
    them((result)=>location.reload())
    .catch((err) => console.log(err));

}
      
  return (


    <div className='parent_conatiner'>
     <Create />
    {
    todos.length===0 ? (
    
    <div className='no_record'> <h2>No Record</h2></div>
    )
    :
    <div className='task_container'>
        {
    todos.map((todo, index) => (
    <div  className='task'key={index}>
    
    
   <div className='checkbox' onClick={() => handleEdit(todo._id)}>
    {
    todo.done ? 
    <BsFillCheckCircleFill className='icons'></BsFillCheckCircleFill>
    :
     <BsCircleFill className='icon'/>
}


    <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
    </div>
    
    <BsFillTrashFill onClick={()=>handledelete(todo._id)}/>
    </div>
   
   
   
  
))
}
</div>

}
</div>
  )
}


export default Home
