
import axios from 'axios';


export const userLogin = ( data ) =>
    axios({
        url: '/api/front/index/login',
        method: 'post',
        data
    })




