import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Register() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/register", { username, email, password })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        navigate('/login')


    }
    return (
        <div className='w-50 m-4'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
                <p>Already have account ?</p>
                <button className='btn btn-link'><Link to="/login">Log in</Link></button>
            </form>
        </div>
    )
}
