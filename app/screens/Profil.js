import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Profil = ({navigation, route}) => {
    return (
        <View style={styles.container}>
            <Text>
                {route.params.user}
            </Text>
            <StatusBar style="auto" />
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
    input: {
        height: 40,
        width: 120,
        margin: 5,
        padding: 10,
        borderWidth: 1,
        textAlign: 'center',
        borderRadius: 7
    },
});

export default Profil;