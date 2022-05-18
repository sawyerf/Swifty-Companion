import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api from '../utils/api';
import { AuthError } from 'expo-auth-session';
import ProjectList from '../components/ProjectList';
import SkillList from '../components/SkillList';

const Profil = ({ navigation, route }) => {
    const [user, setUser] = React.useState();
    const [userCursus, setUserCursus] = React.useState();
    const [levelP, setLevelP] = React.useState('0%');
    const [projects, setProjects] = React.useState();

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
            let selectCursus;
            selectCursus = user?.cursus_users.filter((item) => {return item.cursus_id == user?.projects_users[0]?.cursus_ids[0]})[0];
            if (!selectCursus) {
                selectCursus = user.cursus_users[0];
            }
            setUserCursus(selectCursus);
            setLevelP(levelToP(selectCursus.level));
            setProjects(user?.projects_users.filter((item) => {
                if (item?.status != 'finished') return false;
                if (item?.cursus_ids[0] != selectCursus.cursus_id) return false;
                return true;
            }))
            return selectCursus;
        }
        return null;
    }

    const changeCursus = () => {
        if (user?.cursus_users?.length > 1) {
            let selectCursus;

            const indexCurrent = user.cursus_users.indexOf(userCursus);
            const index = (indexCurrent + 1) % user.cursus_users.length;
            selectCursus = user.cursus_users[index];
            setUserCursus(selectCursus);
            setLevelP(levelToP(selectCursus.level));
            setProjects(user?.projects_users.filter((item) => {
                if (item?.status != 'finished') return false;
                if (item?.cursus_ids[0] != selectCursus.cursus_id) return false;
                return true;
            }))
            return selectCursus;
        }
    }

    const levelToP = (levelI) => {
        // console.log('levelToP');
        if (!levelI) {
            return '0%';
        }
        return String(((levelI % 1) * 100)) + '%';
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{width: '100%'}}>
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
                    <Text
                        onPress={changeCursus} 
                        style={{ position: 'absolute', right: 10, top: 10, fontSize: 13, backgroundColor: '#f6f6f6', padding: 5 }}>
                        🏫 {userCursus?.cursus?.name}
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
                <View style={{ width: '100%', height: 40, paddingHorizontal: 10, marginHorizontal: 'auto', alignItems: 'center', marginBottom: 7 }}>
                    <View style={{ backgroundColor: '#e2e2e2', position: 'absolute', width: '100%', height: '100%', borderRadius: 13 }} />
                    <View style={{ backgroundColor: '#c5c5c5', position: 'absolute', width: levelP, height: '100%', borderTopStartRadius: 13, borderBottomStartRadius: 13, left: 10 }} />
                    <Text style={{ width: '100%', height: '100%', position: 'absolute', textAlign: 'center', textAlignVertical: 'center' }}>{userCursus?.level}</Text>
                </View>
                <ProjectList projects={projects} />
                <SkillList skill={userCursus} />
            </ScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        paddingVertical: 10,
    },
    conTop: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        marginVertical: 5,
    },
    profilImage: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        marginRight: 10
    },
});

export default Profil;