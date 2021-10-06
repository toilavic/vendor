import constants from '../constants.json'
import axios from 'axios'

export default function APIGetVendors(isMine, status) {
    const token = localStorage.getItem('token')

    var requiredInfo = {
        "isMine": isMine,
        "status": status
    }

    var config = {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        url: constants.baseAddress + 'api/items',
        params: requiredInfo
    };

    return axios(config)
        .then(response => response)
        .catch(function (error) {
            if (error.response) {
                return error.response;
            }
        })
}
