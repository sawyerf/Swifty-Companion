import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api from '../utils/api';

const Search = ({navigation}) => {
    const [search, onChangeSearch] = React.useState("des barres");
    const [user, setUser] = React.useState();

    const onPressSearch = () => {
        navigation.navigate('Profil', {user: search});
    }

    const searchUser = () => {
        // const users = await api.get('/v2/users', {
        //     params: {
        //         'filter[login]': route.params.user
        //     }
        // });
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeSearch}
                value={search}
                onSubmitEditing={onPressSearch}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5,
    },
    input: {
        height: 40,
        width: '100%',
        padding: 10,
        borderWidth: 1,
        textAlign: 'center',
        borderRadius: 7
    },
    button: {

    }
});

export default Search;