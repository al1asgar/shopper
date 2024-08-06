import {Switch} from 'react-native';
import React, {useState} from 'react';
import {ColorUtil} from '../../util/ColorUtil';


const CommonSwitcher = ({...rest}) => {
    const {style} = {...rest};
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <Switch
            trackColor={{false: '#767577', true: '#000'}}
            thumbColor={isEnabled ? ColorUtil.google : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
    );
};
export default CommonSwitcher;
