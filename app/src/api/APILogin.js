import constants from '../constants.json'
import axios from 'axios'
export default function APILogin(userInfo) {
  return axios.post(constants.baseAddress + 'api/login', userInfo)
    .then(response => response)
    .catch(function (error) {
      if (error.response) {
        return error.response;
      }
    })
}