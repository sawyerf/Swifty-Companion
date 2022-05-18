import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import api from '../utils/api';
import { AuthError } from 'expo-auth-session';

const SkillList = (props) => {
    const [select, setSelect] = React.useState();
    const colors = ['black', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen']

    const calcSize = (xp) => {
        let level = 0;
        props?.skill?.skills?.map((item) => {
            level += item.level;
        });

        return (String((xp * 100) / level) + '%');
    }

    const makeChart = () => {
        let index = 0;

        return props.skill?.skills?.map((item) => {
            index++;
            if (!select) {
                setSelect(item);
            }
            return (
                <View onTouchStart={() => {
                        setSelect(item);
                    }}
                    key={index}
                    style={{ width: calcSize(item.level), height: '100%', backgroundColor: colors[item.id] }}
                />
            );
        });
    }

    return (
        <View style={{ paddingHorizontal: 8, marginTop: 7 }}>
            <View style={{ width: '100%', height: 10, flexDirection: 'row' }}>
                {makeChart()}
            </View>
            <View style={{marginTop: 7, marginStart: 10, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{ width: 10, height: 10, backgroundColor: colors[select?.id] }} />
                <Text> {select?.name} {select?.level} </Text>
            </View>
        </View>
    );
}


export default SkillList;