import React from 'react';
import { Text, View, Button } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

const SlotCard = (props) => {
    const sinceDate = () => {
        const now = new Date();
        const correc = new Date(props?.slot?.begin_at);
        const since = (correc - now) / 1000;
        const date = {};

        date.day = Math.trunc(since / 86400);
        date.hour = Math.trunc(since % 86400 / 3600);
        date.minute = Math.trunc((since % 3600) / 60);
        date.second = Math.trunc(since % 3600 % 60);
        for (const key of ['day', 'hour', 'minute', 'second']) {
            // console.log(key, date[key]);
            if (date[key] != 0) {
                return ({
                    key: key,
                    since: date[key]
                })
            }
        }
        return ({
            key: 'second',
            since: 0
        });
    }

    const formatText = () => {
        const since = sinceDate();

        return (
            <Text style={{}}>
                <Text style={{ color: 'blue' }}>
                    {
                        props.slot?.scale_team?.corrector?.login ?
                            props.slot?.scale_team?.corrector?.login :
                            'someone'
                    }
                </Text>
                {
                    (since?.since >= 0) ?
                        ' will be correct by ' :
                        ' corrected '
                }
                <Text style={{ color: 'blue' }}>
                    {
                        props.slot?.scale_team?.correcteds[0]?.login ?
                            props.slot?.scale_team?.correcteds[0]?.login :
                            'someone'
                    }
                </Text>
                {
                    (since?.since >= 0) ?
                        ' in ' + since.since + ' ' + since.key + 's' :
                        ' since ' + Math.abs(since.since) + ' ' + since.key + 's'
                }
            </Text>
        )
    }

    return (
        <View style={{ flexDirection: 'row', marginHorizontal: 10, paddingVertical: 9, borderBottomWidth: 1, borderColor: '#d9d9d9' }}>
            {props?.slot ? formatText() : <></>}
        </View>
    );
}

export default SlotCard;