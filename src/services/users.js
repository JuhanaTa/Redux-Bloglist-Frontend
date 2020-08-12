import axios from 'axios'

const url = '/api/users'

const users = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

export default { users }