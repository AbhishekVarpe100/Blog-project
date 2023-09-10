import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import EditPost from './EditPost'
import { createContext } from 'react';
import CreatePost from './CreatePost'
import Contact from './Contact'

const userContext = createContext();
export default function App() {
  return (
    <div>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>
          <Route path='/editpost/:id' element={<EditPost></EditPost>}></Route>
          <Route path='/create' element={<CreatePost></CreatePost>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}
