import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState();
    const [err, setErr] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/login", { email, password })
            .then(res => {

                if (res.data === "Success") {
                    navigate('/')
                    console.log(res.data)
                }
                else {

                    let str = 'please enter valid credentials';
                    setErr(str)
                    setInterval(() => {
                        setErr("")
                    }, 3000);
                    console.log(res.data)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className='w-50 m-4'>
                {err}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <p>Not registered</p>
                <Link to='/register'>Register</Link>
            </div>
        </div>
    )
}
