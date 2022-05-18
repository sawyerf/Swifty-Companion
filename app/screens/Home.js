import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery, exchangeCodeAsync } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

import { API_UID, RANDOM_USER } from '@env';
import { useEffect } from 'react/cjs/react.production.min';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize',
}

const Home = ({ navigation, route }) => {
    const [code, setCode] = React.useState();
    const [token, setToken] = React.useState();

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
            console.log('Check Code 1');
            if (!code) {
                const resCode = await getStorage('code');
                console.log('setCode', resCode);
                if (resCode) {
                    setCode(resCode);
                    return;
                }
            }
        }
        checkCode();
    }, [code]);

    React.useEffect(() => {
        const checkToken = async () => {
            console.log('Check Token 1');
            if (!token) {
                const res = await getStorage('token');
                if (res) {
                    console.log('setToken', res);
                    setToken(res);
                    return;
                }
                if (code) {
                    const res_token = await api.getToken(code);
                    if (!res_token) {
                        await AsyncStorage.removeItem('code');
                        setCode(undefined);
                    } else {
                        await AsyncStorage.setItem('token', res_token);
                        setToken(res_token);
                    }
                }
                return;
            }
            if (code && token) {
                navigation.navigate('Profil', { uid: RANDOM_USER });
            }
        }
        checkToken();
    }, [token, code])

    React.useEffect(() => {
        const getReponse = async () => {
            if (response?.type === 'success') {
                await AsyncStorage.setItem('code', response.params.code);
                await AsyncStorage.removeItem('token');
                await setCode(response.params.code);
                await setToken(undefined);
                console.log('code', response.params.code);
            }
        }
        getReponse();
    }, [response]);

    return (
        <View style={styles.container}>
            <Text>
                Click to connect to intra
            </Text>
            <Text>
                {code}
            </Text>
            <Text>
                {token}
            </Text>
            <Button
                disabled={!request}
                title="Connect"
                onPress={async () => { await promptAsync() }}
            />
            {/* <Button
                title="Get Token"
                onPress={async () => { await api.getToken(code); }}
            />
            <Button
                title="Refresh Token"
                onPress={async () => {
                    const refreshToken = await AsyncStorage.getItem('refresh_token');
                    await api.upToken(refreshToken);
                }}
            /> */}
            <Button
                title="Profil"
                onPress={() => { navigation.navigate('Profil', { uid: 40321 }); }}
            />
            <Button
                title="Search"
                onPress={() => { navigation.navigate('Search', {}); }}
            />
            {/* <Button
                title="Clear"
                onPress={() => {
                    AsyncStorage.removeItem('code');
                    AsyncStorage.removeItem('token');
                }}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;