
import constants from '../constants.json'
import axios from 'axios'
export default function APIUpdateStatus(status, id) {

    const token = localStorage.getItem('token')

    var keyRequiredInfo = {
        "status": status,
    }

    var config = {
        method: 'put',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        url: constants.baseAddress + 'api/items/' +id,
        data: keyRequiredInfo
    };

    return axios(config)
        .then(response => response)
        .catch(function (error) {
            if (error.response) {
                return error.response;
                // console.log(error.response.status);
                // console.log(error.response.headers);
            }
        })
}