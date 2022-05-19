import React from 'react';
import { View, ScrollView } from 'react-native';
import ProjectCard from './ProjectCard';
import getIndex from '../utils';

const ProjectList = (props) => {
    const createList = () => {
        return props.projects?.map((item) => {
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

export default ProjectList;