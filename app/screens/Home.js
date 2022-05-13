import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { authorize } from 'react-native-app-auth';


const Home = ({ navigation, route }) => {
    const onClickConnect = () => {
        https://api.intra.42.fr/oauth/authorize
        ?client_id=b2d2064afd145f3ad8ccea6c28d2feeb0860cf129717eb221b89e954ba740587&redirect_uri=https%3A%2F%2Fgoogle.com&response_type=code
        const config = {
            issuer: 'https://api.intra.42.fr/oauth/authorize',
            clientId: 'b2d2064afd145f3ad8ccea6c28d2feeb0860cf129717eb221b89e954ba740587',
            redirectUrl: 'https://google.com',
        };

        const result = await authorize(config);
    }
    return (
        <View style={styles.container}>
            <Text>
                Click to connect to intra
            </Text>
            <Button
                title="Connect"
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