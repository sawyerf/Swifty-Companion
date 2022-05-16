import axios from 'axios';

import { API_UID, API_SECRET } from '@env';

axios.defaults.baseURL = 'https://api.intra.42.fr/';

const getToken = async (code) => {
    let res;
    try {
        res = await axios.post('/oauth/token',
            {
                grant_type: 'authorization_code',
                client_id: API_UID,
                client_secret: API_SECRET,
                code: code,
                redirect_uri: 'com.swiftycompanion://oauth'
            }
        );
    } catch (error) {
        console.log('error', error);
        return null;
    }
    const token = res.data.access_token;
    console.log('token', token);
    axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
    return token;
}

const getMe = async () => {
    console.log('getMe');
    let res;
    try {
        res = await axios.get('/v2/me');
    } catch (error) {
        console.log('error', error);
        return null;
    }
    // console.log('me', JSON.stringify(res.data, null, 2));
    return (res.data);
}

const get = async (url, params) => {
    console.log('get', url);
    let res;
    try {
        res = await axios.get(url, params);
    } catch (error) {
        console.log('error', error);
        return null;
    }
    // console.log('get', JSON.stringify(res.data));
    return (res.data);
}


export default {
    getToken,
    getMe,
    get,
}