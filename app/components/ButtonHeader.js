import React from 'react';
import { View, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ButtonHeader = (props) => {
    return (
        <View style={{ flexDirection: 'row' }} >
            <Pressable
                onPress={() => { props.navigation.navigate('Search') }}
                style={{
                    padding: 10,
                }}
            >
                <Text style={{ fontSize: 17 }}>🔎</Text>
            </Pressable>
            <Pressable
                onPress={async () => {
                    await AsyncStorage.removeItem('code');
                    await AsyncStorage.removeItem('token');
                    await AsyncStorage.removeItem('refresh_token');
                    props.navigation.replace('Home');
                }}
                style={{
                    padding: 10
                }}
            >
                <Text style={{ fontSize: 17 }}>🚪</Text>
            </Pressable>
        </View>
    );
}

export default ButtonHeader;