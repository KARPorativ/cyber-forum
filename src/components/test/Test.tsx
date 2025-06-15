import { useState } from 'react'
import axios from 'axios'
type Props = {}

export default function Test({}: Props) {

    const [post, setPost] = useState({title:"karp", description:"fg"})
    const addPost = () => {
        axios.post("http://localhost:5000/api/addPost", post);
        // navigate("/avtorization");
      //
    };

  return (
    <div>
        <input value={post.title} onChange={(e) => setPost({...post, title: e.target.value})}></input>
        <button onClick={addPost}>dfg</button>
    </div>
  )
}