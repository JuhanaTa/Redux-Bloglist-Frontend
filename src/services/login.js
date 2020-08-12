import axios from 'axios'

const url = '/api/login'
const userUrl = '/api/users'

const login = async userInfo => {
  const response = await axios.post(url, userInfo)
  return response.data
}

const register = async userInfo => {
  const response = await axios.post(userUrl, userInfo)
  return response.data
}

export default { login, register }