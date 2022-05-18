import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';

const SearchList = (props) => {
    const makeList = () => {
        let index = 0;

        return (props?.users?.map((item) => {
            index++;
            return (
                <View
                    key={index}
                    style={{ flexDirection: 'row', marginHorizontal: 10, paddingVertical: 9, borderBottomWidth: 1, borderColor: '#d9d9d9' }}
                    onTouchEnd={() => {
                        props.navigation.navigate('Profil', {uid: item?.id});
                    }}>
                    <Image
                        style={{ width: 20, height: 20, borderRadius: 10 }}
                        source={{uri: 'https://cdn.intra.42.fr/users/small_' + item?.login + '.jpg' }}
                    />
                    <Text style={{ marginEnd: 5 }}>
                        { item?.displayname }
                    </Text>
                    <Text style={{ marginStart: 'auto' }}>
                        @{ item?.login }
                    </Text>
                    <View></View>
                </View >
            )
        })
        )
    }

    return (
        <ScrollView>
            {makeList()}
        </ScrollView>
    )
}

export default SearchList;