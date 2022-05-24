import React from 'react';
import { Text, View } from 'react-native';

const LevelCard = (props) => {
    const [levelP, setLevelP] = React.useState('0%');

    const levelToP = (levelI) => {
        if (!levelI) {
            return '0%';
        }
        return String(((levelI % 1) * 100)) + '%';
    }

    React.useEffect(() => {
        setLevelP(levelToP(props?.cursus?.level));
    }, [props.cursus])

    return (
        <View style={{ width: '100%', height: 40, paddingHorizontal: 10, marginHorizontal: 'auto', alignItems: 'center', marginBottom: 7 }}>
            <View style={{ backgroundColor: '#e2e2e2', position: 'absolute', width: '100%', height: '100%', borderRadius: 13 }} />
            <View style={{ backgroundColor: '#c5c5c5', position: 'absolute', width: levelP, height: '100%', borderTopStartRadius: 13, borderBottomStartRadius: 13, left: 10 }} />
            <Text style={{ width: '100%', height: '100%', position: 'absolute', textAlign: 'center', textAlignVertical: 'center' }}>{props?.cursus?.level?.toFixed(2)}</Text>
        </View>
    )
}

export default LevelCard;