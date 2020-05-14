import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'http://localhost:3000/',
       
    })
}
// Base url is specified in this file 
