import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = [], action) => {
  switch(action.type){
  case 'LOGIN':
    return action.data
  case 'CLEAR':
    return action.data
  case 'INIT_USER':
    return action.data
  case 'REGISTER':
    return action.data
  default:
    return state
  }
}


export const loginUser = ( userObject ) => {
  const username = userObject.username
  const password = userObject.password
  return async dispatch => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('blogUser', JSON.stringify(user))

    dispatch({
      type: 'LOGIN',
      data: {
        token: user.token,
        username: user.username,
        name: user.name,
      }
    })
  }
}

export const registerUser = ( userObject ) => {
  const username = userObject.username
  const name = userObject.name
  const password = userObject.password

  return async dispatch => {
    const user = await loginService.register({ username, name, password })
    dispatch({
      type: 'REGISTER',
      data: {
        username: user.username,
        name: user.name,
        password: user.password
      }
    })
  }
}

export const removeUser = () => {
  window.localStorage.clear()
  return async dispatch => {
    dispatch({
      type: 'CLEAR',
      data: {}
    })
  }
}

export const initializeUser = () => {
  const savedLoggedinUser = window.localStorage.getItem('blogUser')
  const user = JSON.parse(savedLoggedinUser)
  blogService.setToken(user.token)
  return async dispatch => {
    dispatch({
      type: 'INIT_USER',
      data: {
        token: user.token,
        username: user.username,
        name: user.name
      }
    })
  }

}


export default loginReducer