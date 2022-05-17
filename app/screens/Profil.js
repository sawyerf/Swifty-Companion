import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api from '../utils/api';
import { AuthError } from 'expo-auth-session';
import ProjectList from '../components/ProjectList';
import SkillList from '../components/SkillList';

const Profil = ({ navigation, route }) => {
    const [user, setUser] = React.useState();
    const [userCursus, setUserCursus] = React.useState(0);
    const [levelP, setLevelP] = React.useState('10%');

    React.useEffect(() => {
        if (!user) {
            getUser();
        }
    })

    React.useEffect(() => {
        if (!userCursus) {
            getCursus();
        }
    }, [user])

    const getUser = async () => {
        const res_user = await api.get('/v2/users/' + route.params.uid)
        if (res_user) {
            setUser(res_user);
        }
    }

    const getCursus = () => {
        if (user?.cursus_users?.length > 0) {
            for (const cursus of user.cursus_users) {
                if (cursus.cursus_id == 21) {
                    setUserCursus(cursus);
                    setLevelP(levelToP(cursus.level));
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
            <ScrollView>
                <View style={styles.conTop}>
                    <Image
                        style={styles.profilImage}
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
                <View style={{ width: '100%', height: 40, paddingHorizontal: 10, marginHorizontal: 'auto', alignItems: 'center', marginBottom: 7 }}>
                    <View style={{ backgroundColor: '#e2e2e2', position: 'absolute', width: '100%', height: '100%', borderRadius: 13 }} />
                    <View style={{ backgroundColor: '#c5c5c5', position: 'absolute', width: levelP, height: '100%', borderTopStartRadius: 13, borderBottomStartRadius: 13, left: 10 }} />
                    <Text style={{ width: '100%', height: '100%', position: 'absolute', textAlign: 'center', textAlignVertical: 'center' }}>{userCursus?.level}</Text>
                </View>
                <ScrollView
                    style={{ height: 150 }}
                    horizontal={true}
                >
                    <ProjectList projects={user?.projects_users} />
                </ScrollView>
                <SkillList skill={userCursus}/>
                <StatusBar style="auto" />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        paddingVertical: 10
    },
    conTop: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        margin: 5
    },
    profilImage: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        marginRight: 10
    },
});

export default Profil;