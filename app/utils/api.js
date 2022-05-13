import axios from 'axios';

import { API_UID, API_SECRET } from '@env';

axios.defaults.baseURL = 'https://api.intra.42.fr/';

const getToken = async (code) => {
    const res = await axios.post('/oauth/token', 
        {
            params: {
                'grant_type': 'client_credentials',
                'client_id': API_UID,
                'client_secret': API_SECRET,
                'code': code
            }
        }
    );
    console.log(res);
    axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
}

export default {
    getToken,
}