import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_UID, API_SECRET } from '@env';

axios.defaults.baseURL = 'https://api.intra.42.fr/';

const getData = async () => {
    console.log('Get Data');
    let value;

    try {
        value = await AsyncStorage.getItem('token')
        if (value !== null) {
            axios.defaults.headers.common["Authorization"] = 'Bearer ' + value;
            console.log('Set save Token:', value);
        }
    } catch (e) {
        console.log('api', e);
    }
}

getData();

const checkToken = async () => {
    let res;

    console.log('Check Orginal Token');
    try {
        res = await axios.get('/oauth/token/info')
    } catch (error) {
        console.log('error:', 'CheckToken:', error);
        console.log(error?.response?.data)
        return false;
    }
    console.log(res.data);
    if (res?.data?.expires_in_seconds > 10) {
        return true;
    }
    return false;
}

const getToken = async (code) => {
    let res;
    
    console.log('Get Token');
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
        console.log('error:', 'getToken', ':', error);
        console.log(error?.response?.data)
        return null;
    }
    const token = res.data.access_token;
    console.log('token', token);
    axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
    AsyncStorage.setItem('token', token);
    return token;
}

const get = async (url, params) => {
    console.log('get', url);
    let res;
    try {
        res = await axios.get(url, params);
    } catch (error) {
        console.log('error', error);
        console.log(error?.response?.data)
        if (error?.response?.data?.message == 'The access token expired') {
            const code = await AsyncStorage.getItem('code');
            if (getToken(code)) {
                return get(url, params);
            }
        }
        return null;
    }
    // console.log('get', JSON.stringify(res.data));
    return (res.data);
}

export default {
    getToken,
    get,
    checkToken,
}