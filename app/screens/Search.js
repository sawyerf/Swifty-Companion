import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const Search = ({navigation}) => {
    const [search, onChangeSearch] = React.useState("des barres");

    const onPressSearch = () => {
        navigation.navigate('Profil', {user: search});
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeSearch}
                value={search}
            />
            <Button
                title="Search"
                onPress={onPressSearch}
            />
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
    button: {

    }
});

export default Search;