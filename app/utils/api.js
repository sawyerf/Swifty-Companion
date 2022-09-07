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
    if (res?.data?.expires_in_seconds > 10) {
        return true;
    }
    return false;
}

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
        console.log('error:', 'getToken', ':', error);
        console.log(error?.response?.data)
        return null;
    }
    const token = res.data.access_token;
    console.log('token', token);
    axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refresh_token', res?.data?.refresh_token);
    return token;
}

const upToken = async (refreshToken) => {
    let res;

    console.log('Refresh Token');
    try {
        res = await axios.post('/oauth/token',
            {
                grant_type: 'refresh_token',
                client_id: API_UID,
                client_secret: API_SECRET,
                refresh_token: refreshToken,
                redirect_uri: 'com.swiftycompanion://oauth'
            }
        );
    } catch (error) {
        console.log('error:', 'refreshToken', ':', error);
        console.log(error?.response?.data)
        return null;
    }
    const token = res.data.access_token;
    console.log('token', token);
    axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refresh_token', res?.data?.refresh_token);
    return token;
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

const get = async (url, params) => {
    console.log('get', url);
    let res;
    try {
        res = await axios.get(url, params);
    } catch (error) {
        console.log('error', error);
        console.log(error?.response?.data)
        if (error?.response?.status === 401) {
            const refreshToken = await AsyncStorage.getItem('refresh_token');
            if (await upToken(refreshToken)) {
                return await get(url, params);
            }
        } else if (error?.response?.status === 429) {
            await sleep(1000);
            return await get(url, params);
        }
        return null;
    }
    return (res.data);
}

export default {
    getToken,
    get,
    checkToken,
    upToken,
}