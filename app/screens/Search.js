import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api from '../utils/api';
import SearchList from '../components/SearchList';

import { RANDOM_USER } from '@env';

const Search = ({navigation}) => {
    const [search, onChangeSearch] = React.useState(RANDOM_USER);
    const [users, setUsers] = React.useState();
    const [timeout, setVarTimeout] = React.useState();

    const onPressSearch = async () => {
        const res = await searchUser();

        if (!res.length) return ;
        let selectUser = res.filter((item) => { return item.login == search });
        if (!selectUser.length) {
            selectUser = res;
        }
        navigation.navigate('Profil', {uid: selectUser[0].id});
    }

    const searchUser = async () => {
        const res = await api.get('/v2/users', {
            params: {
                'search[login]': search
            }
        });
        setUsers(res)
        return res;
    }

    React.useEffect(() => {
        if(timeout) clearTimeout(timeout);
        if (!search || !search.length) {
            return setUsers(undefined)
        }
        setVarTimeout(setTimeout(() => {
            searchUser();
        }, 500));
    }, [search])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeSearch}
                value={search}
                onSubmitEditing={onPressSearch}
            />
            <SearchList users={users} navigation={navigation}/>
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