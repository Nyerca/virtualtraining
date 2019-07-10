import axios from 'axios'

// Connecting to the server
export default() => {
  return axios.create({
    baseURL: `http://localhost:8081`
  })
}
