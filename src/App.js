import React, { useEffect, useRef } from 'react'
import './index.css'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { getUsers } from './reducers/usersReducer'
import MainRender from './components/MainRender'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(() => {
    dispatch(getUsers())
  },[dispatch])

  useEffect(() => {
    try{dispatch(initializeUser())}catch(exception){
      console.log('no user')
    }
  },[dispatch])

  const blogFormRef = useRef()

  const createBlogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <CreateBlogForm />
    </Togglable>
  )



  return (
    <div className="container">
      <Router>
        <MainRender createBlogForm={createBlogForm}/>
      </Router>
    </div>
  )
}

export default App