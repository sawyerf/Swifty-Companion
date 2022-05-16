import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api from '../utils/api';
import { AuthError } from 'expo-auth-session';
import Project from './Project';

const ProjectList = (props) => {
    // const [projectsInfo, setProjectsInfo] = React.useState();

    // const getProjects = async (projects) => {
    //     console.log('projects', projects);
    //     const ids = projects?.map((item) => {
    //         if (item?.status != 'finished') return;
    //         if (item?.cursus_ids[0] != 21) return;
    //         return item?.project?.id
    //     }).filter(n => n).join(',');
    //     console.log('ids', ids);
    //     const res = await api.get('/v2/projects', {
    //         params: {
    //             'filter[id]': ids
    //         }
    //     })
    //     setProjectsInfo(res)
    //     // console.log('project', res);
    // }

    // React.useEffect(() => {
    //     if (!projectsInfo) {
    //         console.log('props', props.projects);
    //         getProjects(props.projects);
    //     }
    // }, [props.projects])

    const createList = () => {
        return props.projects?.map((item) => {
            if (item?.status != 'finished') return;
            if (item?.cursus_ids[0] != 21) return;
            return (
                <Project project={item}/>
            )
        })
    }

    return (
        <View style={{ width: '100%', height: 150, flexDirection: 'row' }}>
            {createList()}
        </View>
    );
}

export default ProjectList