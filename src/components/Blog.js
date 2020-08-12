import React from 'react'
import { deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { getUsers } from '../reducers/usersReducer'
import {
  Link
} from 'react-router-dom'
import { Button } from 'react-bootstrap'


const Blog = ({ id, blog }) => {
  const dispatch = useDispatch()
  console.log('blog id' + id)

  const blogDeletion = async (event) => {
    event.preventDefault()
    console.log('id of blog: ' + blog.id)
    try{
      await dispatch(deleteBlog(blog.id))
      await dispatch(getUsers())
      dispatch(createNotification('blog removed', 'success', 5))
    }catch(e){
      dispatch(createNotification('You cant remove that', 'error', 5))
    }
  }


  return (
    <tr>
      <td>
        <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </td>
      <td>
        <Button onClick={blogDeletion} id='removeBtn'>delete</Button>
      </td>
    </tr>

  )}

export default Blog
