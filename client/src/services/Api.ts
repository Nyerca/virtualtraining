import axios from 'axios';
// Required for cookies -- TODO: forse non e' il massimo passare le credenziali ad ogni richiesta
axios.defaults.withCredentials = true;

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
