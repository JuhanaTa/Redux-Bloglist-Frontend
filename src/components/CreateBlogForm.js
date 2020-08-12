import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { getUsers } from '../reducers/usersReducer'
import { Form, Button } from 'react-bootstrap'

const CreateBlogForm = () => {
  const dispatch = useDispatch()
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.Title.value,
      author: event.target.Author.value,
      url: event.target.Url.value
    }
    event.target.Title.value = ''
    event.target.Author.value = ''
    event.target.Url.value = ''
    try{
      await dispatch(createBlog(blogObject))
      await dispatch(getUsers())
      dispatch(createNotification(`new blog '${blogObject.title}' added`, 'success', 5))
    }catch(exception){
      dispatch(createNotification('blog was not added', 'error', 5))
    }
  }


  return(
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id='title'
            type="text"
            name="Title"
          />

          <Form.Label>author:</Form.Label>
          <Form.Control
            id='author'
            type="text"
            name="Author"
          />

          <Form.Label>url:</Form.Label>
          <Form.Control
            id='url'
            type="text"
            name="Url"
          />

          <Button variant="primary" type="submit" id='createBlogBtn'>create</Button>
        </Form.Group>
      </Form>
    </div>

  )
}

export default CreateBlogForm