import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import api from '../utils/api';
import UserCard from '../components/UserCard';
import LevelCard from '../components/LevelCard';
import ProjectList from '../components/ProjectList';
import SlotList from '../components/SlotList';

const Me = ({ navigation }) => {
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
                const statusAccept = ['in_progress', 'creating_group', 'waiting_for_correction'];
                if (statusAccept.indexOf(item?.status) == -1) return false;
                if (item?.cursus_ids[0] != userCursus.cursus_id) return false;
                return true;
            }));
        }
    }, [userCursus])

    const getUser = async () => {
        const res_user = await api.get('/v2/me')
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
        <View>
            <ScrollView>
                <UserCard
                    user={user}
                    cursus={{ cursus: userCursus, set: setUserCursus }}
                />
                <LevelCard cursus={userCursus} />
                <ProjectList projects={projects} />
                {/* <SlotList /> */}
                <StatusBar style="auto" />
            </ScrollView>
        </View>
    )
}

export default Me;