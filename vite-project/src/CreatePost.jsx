import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function CreatePost() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    axios.post("http://localhost:3001/create", formData)
      .then(res => {
        if (res.data === 'Success') {
          navigate('/')
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <div className='p-4' style={{ "background": "grey" }}>
      <div>
        <form onSubmit={handleSubmit}>
          <center>
            <input className='form-control border border-dark' onChange={(e) => setTitle(e.target.value)} placeholder='Enter title' type="text" /><br></br>
            <textarea className='form-control border border-dark' onChange={(e) => setDescription(e.target.value)} placeholder='Enter description' name="desc" id="desc" cols="30" rows="10"></textarea><br></br>
            <input onChange={(e) => setFile(e.target.files[0])} className='form-control' type="file" name="file" id="" />
            <button className='btn btn-success'>Upload</button>
          </center>

        </form>
      </div>
    </div>
  )
}
