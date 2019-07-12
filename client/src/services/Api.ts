import axios from 'axios';

export default function() {
  return axios.create({
        baseURL: `http://localhost:8081`,
      });
}

// Connecting to the server
// export default() => {
//   return axios.create({
//     baseURL: `http://localhost:8081`
//   })
// }
