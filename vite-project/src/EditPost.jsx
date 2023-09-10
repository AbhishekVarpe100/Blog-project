import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function EditPost() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [file, setFile] = useState();
    const navigate = useNavigate();

    const { id } = useParams();

    const [post, setPost] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        axios.put("http://localhost:3001/editpost/" + id, { title, description })
            .then(res => {
                if (res.data === 'Success') {
                    navigate('/')
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('http://localhost:3001/getpostbyid/' + id)
            .then(result => {
                setTitle(result.data.title)
                setDescription(result.data.description)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className='p-4' style={{ "background": "grey" }}>
            <div>
                <form onSubmit={handleSubmit}>
                    <center>
                        <input className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter title' type="text" /><br></br>
                        <textarea className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter description' name="desc" id="desc" cols="30" rows="10"></textarea><br></br>

                        <button className="btn btn-success">Update</button>
                    </center>

                </form>
            </div>
        </div>
    )
}
