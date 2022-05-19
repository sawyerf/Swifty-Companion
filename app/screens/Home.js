import React from 'react';
import { Text, View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery, exchangeCodeAsync } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../utils/api';
import { API_UID } from '@env';
import { StatusBar } from 'expo-status-bar';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize',
}

const Home = ({ navigation, route }) => {
    const [code, setCode] = React.useState();

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: API_UID,
            scopes: ['public', 'projects'],
            redirectUri: makeRedirectUri({
                native: 'com.swiftycompanion://oauth'
            })
        },
        discovery
    );

    const getStorage = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    React.useEffect(() => {
        const checkCode = async () => {
            if (!code) {
                const resCode = await getStorage('code');
                console.log('setCode', resCode);
                if (resCode) {
                    setCode(resCode);
                }
            }
        }
        checkCode();
    });

    React.useEffect(() => {
        const checkToken = async () => {
            let currrentToken = await getStorage('token');
            if (!currrentToken && code) {
                currrentToken = await api.getToken(code);
                if (!currrentToken) {
                    await AsyncStorage.removeItem('code');
                    setCode(undefined);
                }
            }
            console.log('setToken', currrentToken);
            if (code && currrentToken) {
                navigation.replace('Me');
            }
        }
        checkToken();
    }, [code])

    React.useEffect(() => {
        const getReponse = async () => {
            if (response?.type === 'success') {
                await AsyncStorage.setItem('code', response.params.code);
                await AsyncStorage.removeItem('token');
                await setCode(response.params.code);
                console.log('setCode2', response.params.code);
            }
        }
        getReponse();
    }, [response]);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                Click to connect to intra
            </Text>
            <Button
                disabled={!request}
                title="Connect"
                onPress={() => { promptAsync() }}
            />
            <StatusBar style="auto" />
        </View>
    );
}

export default Home;