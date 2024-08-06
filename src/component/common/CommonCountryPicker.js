import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import {useDispatch} from 'react-redux';
import {LanguageService} from '../../persistence/language/LanguageService';
import {LanguageAction} from '../../persistence/language/LanguageAction';
import {ResponsiveUtil} from '../../util/ResponsiveUtil';

const CommonCountryPicker = ({...rest}) => {
    const dispatch = useDispatch();
    const {visible,setVisible} = {...rest};
    const [countryCode, setCountryCode] = useState('GB');
    const [country, setCountry] = useState(null);
    useEffect(()=>{
        LanguageService.getLanguage().then(data=>{
            if(data.key === 'EN'){
                setCountryCode('GB')
            }else if (data.key === 'VI'){
                setCountryCode('VN')
            }
        })
    },[])
    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)
        setVisible(false);
        if(country.cca2 === 'GB'){
            dispatch(LanguageAction.change({
                key : 'EN'
            }))
        }else if(country.cca2 === 'VN'){
            dispatch(LanguageAction.change({
                key : 'VI'
            }))
        }
    }
    const {style} = {...rest};
    return (
        <CountryPicker
            countryCode={countryCode}
            withEmoji
            visible={visible}
            withCountryNameButton={false}
            withFilter
            onSelect={onSelect}
            onClose={()=>{
                setVisible(false);
            }}
            countryCodes={['GB','VN']}
        />
    );
};
const styles = StyleSheet.create({
    line: {
        backgroundColor: '#F3F6F8',
        width: '100%',
        height: ResponsiveUtil.height(1),
    },

});
export default CommonCountryPicker;
