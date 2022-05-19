import React from 'react';
import { Text, View } from 'react-native';
import api from '../utils/api';

const ProjectCard = (props) => {
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

    const emojiMark = (project) => {
        if (!project) return '';
        if (project["validated?"]) return '⭐ ';
        if (!project?.marked) return '🚧 ';
        if (project?.final_mark >= 0 && !project['validated?']) return '❌ ';
    }

    return (
        <View style={{ width: 200, padding: 12, marginLeft: 10, backgroundColor: 'white', borderRadius: 5 }}>
            <Text style={{ position: 'relative', fontWeight: 'bold' }}>{props?.project?.project?.name}</Text>
            <Text style={{ position: 'relative' }} numberOfLines={3}>{projectInfo?.project_sessions[0]?.description}</Text>
            <View style={{ position: 'relative', marginTop: 'auto', flexDirection: 'row' }}>
                <Text>{ emojiMark(props?.project) }{props?.project?.final_mark}</Text>
                <Text onTouchStart={getProject} style={{ position: 'relative', marginStart: 'auto' }}>{projectInfo ? "⏱️ ": "➕"} {projectInfo?.project_sessions[0]?.estimate_time}</Text>
            </View>
        </View>
    )
}

export default ProjectCard;