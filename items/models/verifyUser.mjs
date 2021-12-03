import axios from 'axios';

let apiUser = process.env.apiUserName;
let apiPass = process.env.apiPassword;
let host = process.env.host;

export async function check(username, password) {
  try {
  return axios.post(`${host}/user/check/`+ username, {
    username: username,
    password: password
  }, {
    auth: {
      username: apiUser,
      password: apiPass
    },
  })
  }
  catch (e)
  {
    console.log(error);
  }
}

export async function find(username) {
  return axios.get(`${host}/user/` + username, {
    auth: {
      username: apiUser,
      password: apiPass
    },
  })
}