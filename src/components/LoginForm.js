import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, initializeUser, registerUser } from '../reducers/loginReducer'
import { createNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [showAll, setShow] = useState(false)

  const toggleVisibility = () => {
    if(showAll === true){
      setShow(false)
    }
    else
      setShow(true)
  }

  const addUser = async (event) => {
    event.preventDefault()
    const userObject = {
      username: event.target.Username.value,
      password: event.target.Password.value,
    }
    event.target.Username.value = ''
    event.target.Password.value = ''
    try{
      await dispatch(loginUser(userObject))
      await dispatch(initializeUser())
      dispatch(createNotification('login success', 'success', 5))
    }catch(exception){
      dispatch(createNotification('wrong username or password', 'error', 5))
    }

  }

  const createUser = async (event) => {
    event.preventDefault()
    const userObject = {
      username: event.target.Username.value,
      name: event.target.Username.value,
      password: event.target.Password.value,
    }
    const userObjectForLogin = {
      username: event.target.Username.value,
      password: event.target.Password.value,
    }

    console.log('inside register')

    try{
      await dispatch(registerUser(userObject))
      await dispatch(loginUser(userObjectForLogin))
      dispatch(createNotification('Account created', 'success', 5))
    }catch(exception){
      dispatch(createNotification('account not created', 'error', 5))
    }
  }
  return (
    <div>
      {showAll === false ?
        <div>
          <Login addUser={addUser}/>
          <h5>No account yet?</h5>
          <Button onClick={toggleVisibility} id='showRegisterBtn'>Clich here to create one</Button>
        </div>
        :
        <div>
          <Register createUser={createUser}/>
          <Button onClick={toggleVisibility} id='showRegisterBtn'>Back to login</Button>
        </div> }

    </div>
  )
}

const Login = ({ addUser }) => {

  return(
    <div>
      <h2>Please login</h2>
      <Form onSubmit={addUser}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id='username'
            type="text"
            name="Username"
          />

          <Form.Label>password:</Form.Label>
          <Form.Control
            id='password'
            type="password"
            name="Password"
          />

          <Button variant="primary" type="submit" id='loginBtn'>login</Button>
        </Form.Group>
      </Form>
    </div>
  )

}

const Register = ({ createUser }) => {

  return(
    <div>
      <h2>Create a new account</h2>
      <Form onSubmit={createUser}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id='username'
            type="text"
            name="Username"
          />

          <Form.Label>name:</Form.Label>
          <Form.Control
            id='name'
            type="text"
            name="Name"
          />

          <Form.Label>password:</Form.Label>
          <Form.Control
            id='password'
            type="password"
            name="Password"
          />

          <Button variant="primary" type="submit" id='loginBtn'>register</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
export default LoginForm