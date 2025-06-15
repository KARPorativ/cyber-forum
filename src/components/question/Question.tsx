import axios from 'axios';
import { useState } from 'react'
import classes from './Question.module.css'


export default function Question ()  {

  const [post, setPost] = useState({title:"karp", description:"fg"})
  const addPost = () => {
    axios.post("http://localhost:5000/api/addPost", post);
    // navigate("/avtorization");
  //
};
  return (
    <div className={classes.main}>
    <div >
        <p>Заголовок:</p>
        <input value={post.title} onChange={(e) => setPost({...post, title: e.target.value})}></input>
        <p>Описание:</p>
        <input value={post.description} onChange={(e) => setPost({...post, description: e.target.value})}></input>
        <button onClick={addPost}>Отправить</button>

    </div>

    </div>
  )
}