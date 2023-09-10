import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className='navbar-header'>
      <div><h3>Blog App</h3></div>
      <div>
        <Link className='text-white m-4' to='/'>Home</Link>
        <Link className='text-white m-4' to="/create">Create Post</Link>
        <Link className='text-white m-4' to="/contact">Contact</Link>
      </div>
      <div><h5><Link to="/register" className='link' style={{"display":"none"}}>Register/Login</Link></h5></div>
    </div>
  )
}
export default Navbar;
