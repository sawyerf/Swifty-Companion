import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery, exchangeCodeAsync } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

import { API_UID, API_SECRET, RANDOM_USER } from '@env';

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
            scopes: ['public'],
            redirectUri: makeRedirectUri({
                native: 'com.swiftycompanion://oauth'
            })
        },
        discovery
    );

    React.useEffect(() => {
        const getData = async () => {
            try {
                const valueCode = await AsyncStorage.getItem('code')
                const valueToken = await AsyncStorage.getItem('token')
                if (valueCode !== null) {
                    setCode(valueCode);
                }
                if (valueToken !== null) {
                    setToken(valueToken);
                }
            } catch (e) {
                console.log(e);
            }
        }
        getData()
    });

    React.useEffect(() => {
        if (!code) {
            promptAsync();
            setToken(undefined);
            AsyncStorage.setItem('token', undefined)
        }
        if (!token) {
            api.getToken(code);
        }
        if (code && token) {
            navigation.navigate('Profil', { uid: RANDOM_USER });
        }
    }, [code, token])

    React.useEffect(() => {
        if (response?.type === 'success') {
            setCode(response.params.code);
            AsyncStorage.setItem('code', response.params.code);
            console.log('code', code);
        }
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
                onPress={() => { promptAsync(); }}
            />
            <Button
                title="Get Token"
                onPress={async () => { await api.getToken(code); }}
            />
            <Button
                title="Profil"
                onPress={() => { navigation.navigate('Profil', { uid: RANDOM_USER }); }}
            />
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