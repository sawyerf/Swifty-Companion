import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import getIndex from '../utils';
import api from '../utils/api';
import SlotCard from './SlotCard';

const SlotList = () => {
    const [slots, setSlots] = React.useState();

    React.useEffect(() => {
        const getSlot = async () => {
            const res = await api.get('/v2/me/slots', {
                params: {
                    'filter[future]': false
                }
            })
            const ids = []
            const realRes = res.filter((item) => {
                if (!item?.scale_team) return false;
                if (item?.scale_team?.final_mark !== null) return false;
                if (ids.indexOf(item?.scale_team?.scale_id) != -1) return false;
                ids.push(item?.scale_team?.scale_id);
                return true;
            });
            setSlots(realRes);
        }
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
        </View>
    )
}

export default SlotList;