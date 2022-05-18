import React from 'react';
import { Text, View, Image } from 'react-native';

const UserCard = (props) => {
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        setUser(props.user);
    }, [props]);

    const changeCursus = () => {
        if (user?.cursus_users?.length > 1) {
            let selectCursus;

            const indexCurrent = user.cursus_users.indexOf(props.cursus.cursus);
            const index = (indexCurrent + 1) % user.cursus_users.length;
            selectCursus = user.cursus_users[index];
            props.cursus.set(selectCursus);
            return selectCursus;
        }
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', width: '100%', backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'flex-start', padding: 10, marginVertical: 5 }}>
                <Image
                    style={{ width: 100, height: 100, borderRadius: 100 / 2, marginRight: 10 }}
                    source={{
                        uri: user?.image_url
                    }}
                />
                <View>
                    <Text style={{ fontWeight: 'bold' }}>
                        {user?.displayname}
                    </Text>
                    <Text>
                        @{user?.login}
                    </Text>
                </View>
                <Text
                    onPress={changeCursus}
                    style={{ position: 'absolute', right: 10, top: 10, fontSize: 13, backgroundColor: '#f6f6f6', padding: 5 }}>
                    🏫 {props.cursus?.cursus?.cursus?.name}
                </Text>
                <Text style={{ position: 'absolute', right: 10, bottom: 10, fontSize: 13, backgroundColor: '#f6f6f6', padding: 5 }}>
                    💺 {user?.location ? user?.location : 'Unavailable'}
                </Text>
            </View>
            <View style={{ width: '100%', paddingVertical: 10, paddingHorizontal: 13, backgroundColor: '#ffffff', marginBottom: 7 }}>
                <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                    <Text>
                        {"📍 "}{user?.campus[0]?.name}
                    </Text>
                    <Text style={{ marginLeft: 'auto', textAlign: 'center' }}>
                        {"🪙 "}{user?.correction_point}
                    </Text>
                    <Text style={{ marginLeft: 'auto' }}>
                        {"🏊 "}{user?.pool_month} {user?.pool_year}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 4 }}>
                    <Text>
                        {"☎️ "}{user?.phone}
                    </Text>
                    <Text style={{ marginLeft: 'auto' }}>
                        {"📮 "}{user?.email}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default UserCard;