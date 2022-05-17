import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api from '../utils/api';
import { AuthError } from 'expo-auth-session';
import ProjectCard from './ProjectCard';

const ProjectList = (props) => {
    const createList = () => {
        let index = 0;
        return props.projects?.map((item) => {
            if (item?.status != 'finished') return;
            if (item?.cursus_ids[0] != 21) return;
            index++;
            return (
                <ProjectCard key={index} project={item}/>
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