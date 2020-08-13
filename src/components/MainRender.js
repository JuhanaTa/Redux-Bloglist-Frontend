import React from 'react'
import LoginForm from '../components/LoginForm'
import Notification from '../components/Notification'
import { useSelector, useDispatch } from 'react-redux'
import Blog from '../components/Blog'
import { removeUser } from '../reducers/loginReducer'

import {
  Switch, Route, Link, Redirect, useRouteMatch, NavLink
} from 'react-router-dom'
import OneUser from './OneUser'
import OneBLog from './OneBlog'
import { Table, Navbar, Nav, Card } from 'react-bootstrap'

const UserList =  ({ createBlogForm }) => {

  const dispatch = useDispatch()

  const user = useSelector( state => {
    return state.login
  })

  const allUsers = useSelector(state => {
    return state.users
  })

  const blogs = useSelector( state => {
    return state.blogs
  })


  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const logoutHandler = () => {
    dispatch(removeUser())
  }

  const home = () => {
    return (
      <div>
        {user.name === undefined ? <LoginForm />:
          <div id='mainDiv'>
            <h2>Blogs</h2>
            <BlogList/>
            {createBlogForm()}
          </div>
        }
      </div>
    )
  }

  const BlogList = () => {
    let ident = 0
    blogs.sort(function (a, b) {
      return b.likes - a.likes
    })
    return (
      <div>
        <Table striped>
          <tbody>
            {blogs.map(blog =>
              <Blog key={blog.id} id={ident++} blog={blog}/>
            )}
          </tbody>
        </Table>
      </div>
    )
  }

  const Users = () => {
    return(
      <div>
        {user.name === undefined ? <LoginForm />:
          <div>
            <h2>Blog users</h2>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>blogs created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map(user =>

                      <tr key={user.id}>
                        <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                        <td>{user.blogs.length}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        }
      </div>
    )
  }

  const Navigation = () => {
    if (user.name === undefined){
      return <div></div>
    }
    return(
      <Navbar bg="primary" variant="dark">
        <Nav>
          <Navbar.Text ><NavLink  to="/">Home</NavLink>     <NavLink to="/users">Users</NavLink>   <Button className="ml-auto" handleClick={logoutHandler} text='logout' /></Navbar.Text>
          <Navbar.Brand className="ml-auto">Logged in as {user.name}</Navbar.Brand>
        </Nav>
      </Navbar>
    )
  }

  const usermatch = useRouteMatch('/users/:id')
  const ParamUser = usermatch
    ? allUsers.find(user => user.id === usermatch.params.id)
    : null

  const blogmatch = useRouteMatch('/blogs/:id')
  const paramBlog = blogmatch
    ? blogs.find(blog => blog.id === blogmatch.params.id)
    : null

  return (
    <div>
      <Navigation/>
      <Notification />
      <Switch>
        <Route path="/blogs/:id">
          {user.name === undefined ? <Redirect to='/'/>:
            <div>
              <OneBLog blog={paramBlog}/>
            </div>
          }
        </Route>

        <Route path="/users/:id">
          <OneUser oneUser={ParamUser} user={user} />
        </Route>
        <Route path="/users">
          <Users/>
        </Route>
        <Route path="/">
          {home()}
        </Route>
      </Switch>
    </div>
  )
}


export default UserList