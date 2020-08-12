import React from 'react'
import Notification from '../components/Notification'
import { Card } from 'react-bootstrap'
import {
  Redirect,
} from 'react-router-dom'
const OneUser = ({ oneUser, user }) => {

  if(!oneUser){
    return null
  }
  if(oneUser.blogs.length === 0){
    return (
      <div>
        {user.name === undefined ? <Redirect to='/'/>:
          <div>
            <h3>Blogs from {oneUser.username}</h3>
            <p>Hmm... it seems like there is no blogs from {oneUser.username}</p>
          </div>
        }
      </div>)
  }
  return (
    <div>
      {user.name === undefined ? <Redirect to='/'/>:
        <div>
          <Notification />
          <h3>Blogs from {oneUser.username}</h3>
          <Card style={{ width: '30rem' }}>
            <Card.Body>
              <ul>{oneUser.blogs.map(blog =>
                <List key={blog.id} blog={blog}/>)}
              </ul>
            </Card.Body>
          </Card>
        </div>
      }
    </div>
  )
}

const List = ({ blog }) => {
  return (
    <li>{blog.title}</li>
  )
}




export default OneUser