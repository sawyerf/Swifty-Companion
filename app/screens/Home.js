import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery, exchangeCodeAsync } from 'expo-auth-session';
import { useState } from 'react/cjs/react.production.min';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize',
    // tokenEndpoint: 'https://api.intra.42.fr/oauth/token',
}

const Home = ({ navigation, route }) => {
    // const discovery = useAutoDiscovery('https://api.intra.42.fr/oauth/authorize');

    const [code, setCode] = React.useState('rien');

    // Request
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: 'b2d2064afd145f3ad8ccea6c28d2feeb0860cf129717eb221b89e954ba740587',
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
            const { codex } = response.params.code;
            console.log('res', response)
            console.log('code', codex)
            setCode(response.params.code);
            // const { accessToken } = await exchangeCodeAsync(
            //     {
            //         clientId: request?.clientId,
            //         redirectUri: makeRedirectUri({
            //             native: 'com.swiftycompanion://oauth'
            //         }),
            //         code: result.params.code,
            //     },
            //     { tokenEndpoint: 'https://api.intra.42.fr/oauth/token' }
            // );
            // console.log(accessToken);
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