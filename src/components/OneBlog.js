import React from 'react'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { addLike, addComment } from '../reducers/blogReducer'
import { Form, Button, Card } from 'react-bootstrap'

const OneBlog = ({ blog }) => {

  const dispatch = useDispatch()
  if(!blog){
    return null
  }

  const likeAddition = async (event) => {
    event.preventDefault()
    const blogWithLike = {
      url: blog.url,
      title: blog.title,
      likes: blog.likes + 1,
      author: blog.author,
      comments: blog.comments
    }
    try{
      await dispatch(addLike(blog.id, blogWithLike))
      dispatch(createNotification(`you liked '${blogWithLike.title}'`, 'success', 5))
    }catch(e){
      dispatch(createNotification('blog was not liked (may be already removed)', 'error', 5))
    }
  }

  const commentAddition = async (event) => {
    event.preventDefault()
    let commentToSend = ''
    if (blog.comments){
      blog.comments.push(event.target.Comment.value)
      commentToSend = blog.comments
    }
    else{
      commentToSend = event.target.Comment.value}
    event.target.Comment.value = ''

    const blogWithComment = {
      url: blog.url,
      title: blog.title,
      likes: blog.likes,
      author: blog.author,
      comments: commentToSend,
    }
    try{
      await dispatch(addComment(blog.id, blogWithComment))
      dispatch(createNotification('comment added', 'success', 5))
    }catch(e){
      dispatch(createNotification('something went wrong', 'error', 5))
    }
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={`https://${blog.url}`}>{blog.url}</a>
      <p>Blog added by {blog.author}</p>
      <h4>likes: {blog.likes} <Button onClick={likeAddition} id='likeBtn'>like</Button></h4>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Form onSubmit={commentAddition}>
            <Form.Group>
              <Form.Label>Comments </Form.Label>
              <Form.Control
                id='comment'
                type="text"
                name="Comment"
              />

              <Button variant="primary" type="submit" id='commentBtn'>Create a comment</Button>
            </Form.Group>
          </Form>
          <Comments comments={blog.comments}/>
        </Card.Body>
      </Card>
    </div>
  )
}

const Comments = ({ comments }) => {
  let key = 1
  if(!comments){
    return (
      <div>
      No comments in this blog. Be first one to comment
      </div>
    )
  }
  return(
    <div>
      <ul>{comments.map(comment =>
        <li key={key++}>{comment}</li>)}</ul>
    </div>
  )
}
export default OneBlog