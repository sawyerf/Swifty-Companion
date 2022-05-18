import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api from '../utils/api';
import ProjectList from '../components/ProjectList';
import SkillList from '../components/SkillList';
import UserCard from '../components/UserCard';
import LevelCard from '../components/LevelCard';

const Profil = ({ navigation, route }) => {
    const [user, setUser] = React.useState();
    const [userCursus, setUserCursus] = React.useState();
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

    React.useEffect(() => {
        if (userCursus) {
            setProjects(user?.projects_users.filter((item) => {
                if (item?.status != 'finished') return false;
                if (item?.cursus_ids[0] != userCursus.cursus_id) return false;
                return true;
            }));
        }
    }, [userCursus])

    const getUser = async () => {
        const res_user = await api.get('/v2/users/' + route.params.uid)
        if (res_user) {
            setUser(res_user);
        }
    }

    const getCursus = () => {
        if (user?.cursus_users?.length > 0) {
            let selectCursus;
            selectCursus = user?.cursus_users.filter((item) => { return item.cursus_id == user?.projects_users[0]?.cursus_ids[0] })[0];
            if (!selectCursus) {
                selectCursus = user.cursus_users[0];
            }
            setUserCursus(selectCursus);
            return selectCursus;
        }
        return null;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                <UserCard
                    user={user}
                    cursus={{ cursus: userCursus, set: setUserCursus }}
                />
                <LevelCard cursus={userCursus}/>
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