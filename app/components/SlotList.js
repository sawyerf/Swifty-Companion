import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, Pressable } from 'react-native';
import getIndex from '../utils';
import api from '../utils/api';
import SlotCard from './SlotCard';

const SlotList = () => {
    const [slots, setSlots] = React.useState();

    const getSlot = async () => {
        const res = await api.get('/v2/me/slots', {
            params: {
                // 'filter[future]': true,
                sort: '-begin_at',
            }
        })
        const ids = []
        const realRes = res
            // .sort((a, b) => {
            //     return new Date(b.begin_at) - new Date(a.begin_at);
            // })
            .filter((item) => {
                if (!item?.scale_team) return false;
                if (item?.scale_team?.final_mark !== null) return false;
                if (ids.indexOf(item?.scale_team?.scale_id) != -1) return false;
                ids.push(item?.scale_team?.scale_id);
                return true;
            });
        setSlots(realRes);
    }

    React.useEffect(() => {
        if (!slots) getSlot();
    })

    const makeList = () => {
        return (slots?.map((item) => {
            if (!item.scale_team) return;
            return (
                <SlotCard key={getIndex()} slot={item} />
            )
        }));
    }

    return (
        <View style={{ height: 200, padding: 7 }}>
            <ScrollView>
                {slots ? makeList() : <></>}
            </ScrollView>
            <Pressable
                onPress={() => { getSlot() }}
                style={{
                    position: 'absolute',
                    padding: 10,
                    right: 5,
                    top: 5,
                }}
            >
                <Text style={{ fontSize: 17 }}>🔁</Text>
            </Pressable>
        </View>
    )
}

export default SlotList;