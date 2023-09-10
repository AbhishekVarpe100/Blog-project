import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:3001/getposts')
      .then(posts => {
        setPosts(posts.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete("http://localhost:3001/deletepost/" + id)
      .then(res => {
        if (res.data === 'Success') {
          navigate('/')
          location.reload()
        }
      })
      .catch(err => console.log(err))
  }
  return (

    <center>
      <div style={{ "margin": "2cm" }}>
        {
          posts.map(post => (
            <div key={post._id}>
              <div className="card m-4" style={{ "width": "18rem" }}>
                <img src={`http://localhost:3001/Images/${post.file}`} alt="image" />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <Link to={`/editpost/${post._id}`} className="btn btn-sm btn-primary m-4">Edit Post</Link>

                  <button onClick={() => handleDelete(post._id)} className='btn btn-sm btn-danger'>Delete Post</button>

                </div>
              </div>

            </div>

          ))
        }
      </div>
    </center>
  )
}
