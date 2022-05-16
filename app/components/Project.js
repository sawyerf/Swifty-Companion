import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api from '../utils/api';
import { AuthError } from 'expo-auth-session';

const Project = (props) => {
    const [projectInfo, setProjectInfo] = React.useState();

    const getProject = async () => {
        if (!projectInfo) {
            console.log('projects', props.project.project.id);
            const res = await api.get('/v2/projects/' + props.project.project.id);
            if (res) {
                setProjectInfo(res)
            }
        }
    }

    return (
        <View style={{ width: 200, padding: 12, marginLeft: 10, backgroundColor: 'white' }}>
            <Text style={{ position: 'relative', fontWeight: 'bold' }}>{props?.project?.project?.name}</Text>
            <Text style={{ position: 'relative' }} numberOfLines={3}>{projectInfo?.project_sessions[0]?.description}</Text>
            <View style={{ position: 'relative', marginTop: 'auto', flexDirection: 'row' }}>
                <Text>{'⭐ '}{props?.project?.final_mark}</Text>
                <Text onTouchStart={getProject} style={{ position: 'relative', marginStart: 'auto' }}>{projectInfo ? "⏱️ ": "➕"} {projectInfo?.project_sessions[0]?.estimate_time}</Text>
            </View>
        </View>
    )
}

export default Project;