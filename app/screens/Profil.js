import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api from '../utils/api';
import { AuthError } from 'expo-auth-session';

const Profil = ({ navigation, route }) => {
    const [user, setUser] = React.useState();
    const [level, setLevel] = React.useState(0);
    const [levelP, setLevelP] = React.useState('10%');

    React.useEffect(() => {
        if (!user) {
            getUser();
        }
    })

    React.useEffect(() => {
        if (!level) {
            getLevel();
        }
    }, [user])

    const getUser = async () => {
        const res_user = await api.get('/v2/users/' + route.params.uid)
        if (res_user) {
            await setUser(res_user);
            // console.log('users', JSON.stringify(res_user));
        }
    }

    const getLevel = () => {
        if (user?.cursus_users?.length > 0) {
            for (const cursus of user.cursus_users) {
                if (cursus.cursus_id == 21) {
                    setLevel(cursus.level);
                    setLevelP(levelToP(cursus.level))
                    return cursus;
                }
            }
        }
        return null;
    }

    const levelToP = (levelI) => {
        console.log('levelToP');
        if (!levelI) {
            return '0%';
        }
        return String(((levelI % 1) * 100)) + '%';
    }


    return (
        <View style={styles.container}>
            <View style={styles.conTop}>
                <Image
                    style={styles.profilImage}
                    source={{
                        uri: user?.image_url
                    }}
                />
                <Text>
                    {user?.displayname}
                </Text>
            </View>
            <View>
                <Text>
                    {"📍 "}{user?.campus[0]?.name}
                </Text>
                <Text>
                    {"☎️ "}{user?.phone}
                </Text>
                <Text>
                    {"📮 "}{user?.email}
                </Text>
            </View>
            <View style={{width:'100%', height: 40, backgroundColor:'grey'}}>
                <View style={{backgroundColor: 'black', width: levelP, height: '100%'}}></View>
                    <Text> {level} {levelP} </Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10
    },
    conTop: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    },
    profilImage: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        marginRight: 10
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
});

export default Profil;