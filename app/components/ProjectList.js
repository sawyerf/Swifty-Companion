import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api from '../utils/api';
import { AuthError } from 'expo-auth-session';
import ProjectCard from './ProjectCard';
import getIndex from '../utils';

const ProjectList = (props) => {
    const createList = () => {
        let index = 0;
        return props.projects?.map((item) => {
            index++;
            return (
                <ProjectCard key={getIndex()} project={item} />
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