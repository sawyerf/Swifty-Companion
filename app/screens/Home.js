import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery, exchangeCodeAsync } from 'expo-auth-session';
import { getToken } from '../utils/api';

import { API_UID, API_SECRET } from '@env';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize',
}

const Home = ({ navigation, route }) => {
    const [code, setCode] = React.useState('rien');

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
        console.log('res', response);
        if (response?.type === 'success') {
            setCode(response.params.code);
            console.log('res', response);
            console.log('code', code);
            getToken(code);
            navigation.navigate('Profil');
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
            <Button
                disabled={!request}
                title="Connect"
                onPress={() => { promptAsync(); }}
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