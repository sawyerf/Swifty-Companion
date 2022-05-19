import React from 'react';
import { Text, View, Button } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

const SlotCard = (props) => {
    const sinceDate = () => {
        const now = new Date();
        const correc = new Date(props?.slot?.begin_at);

        const since = (now - correc) / 1000;
        const date = {};
        date.day = Math.floor(since / 86400);
        date.hour = Math.floor(since % 86400 / 3600);
        date.minute = Math.floor(since % 3600 / 60);
        date.second = Math.floor(since % 3600 % 60);
        for (const key of ['day', 'hour', 'minute', 'second']) {
            if (date[key] > 0) return date[key] + ' ' + key;
            // console.log(key)
        }
    }

    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 10, paddingVertical: 9, borderBottomWidth: 1, borderColor: '#d9d9d9' }}>
            <Text style={{}}>
                You will correct by
                {' '}<Text style={{color: 'blue'}}>{props.slot?.scale_team?.correcteds[0]?.login ? props.slot?.scale_team?.correcteds[0]?.login : 'unknown'}</Text>
                {' on '}<Text style={{color: 'blue'}}>{'matcha'}</Text>
                {' in '}{sinceDate()}
            </Text>
        </View>
    );
}

export default SlotCard;