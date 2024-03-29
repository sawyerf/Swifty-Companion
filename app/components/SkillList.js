import React from 'react';
import { Text, View } from 'react-native';
import getIndex from '../utils';

const SkillList = (props) => {
    const [select, setSelect] = React.useState();
    const colors = ['black', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen']

    const calcSize = (xp) => {
        let level = 0;
        props?.skill?.skills?.map((item) => {
            level += item.level;
        });

        return (String(((xp * 100) / level).toFixed(2)) + '%');
    }

    React.useEffect(() => {
        if (props.skill?.skills.length) {
            setSelect(props.skill?.skills[0]);
        } else {
            setSelect(undefined);
        }
    }, [props.skill?.skills]);

    const makeChart = () => {
        return props.skill?.skills?.map((item) => {
            return (
                <View onTouchStart={() => {
                        setSelect(item);
                    }}
                    key={getIndex()}
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
                { select
                    ? <Text> {select?.name}  ꞏ  {select?.level?.toFixed(2)}  ꞏ  {calcSize(select?.level)} </Text>
                    : <></>
                }
            </View>
        </View>
    );
}

export default SkillList;