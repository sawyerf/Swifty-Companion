import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api from '../utils/api';
import { AuthError } from 'expo-auth-session';
import ProjectCard from './ProjectCard';

const ProjectList = (props) => {
    const createList = () => {
        let index = 0;
        // if (!props?.projects?.length) {
        //     return (
        //         <Text>
        //             No project
        //         </Text>
        //     )
        // }
        return props.projects?.map((item) => {
            index++;
            return (
                <ProjectCard key={index} project={item} />
            )
        })
    }

    return (
        <ScrollView
            style={{ width: '100%', height: 150 }}
            horizontal={true}>
            <View style={{ width: '100%', height: 150, flexDirection: 'row' }}>
                {createList()}
            </View>
        </ScrollView>
    );
}

export default ProjectList