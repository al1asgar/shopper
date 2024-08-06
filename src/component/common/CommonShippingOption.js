import {StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {CommonAction} from "../../persistence/common/CommonAction";
import CommonText from "./CommonText";
import {ResponsiveUtil} from "../../util/ResponsiveUtil";
import CommonNumberFormat from "./CommonNumberFormat";
import {ColorUtil} from "../../util/ColorUtil";
import ShoppingCart from "../icon/ShoppingCart";

function CommonShippingOption({...rest}){
    const dispatch = useDispatch();
    const {onChange} = {...rest};
    const lang = useSelector(state => state.LanguageReducer.language);
    const data = useSelector(state => state.CommonReducer.data.shipping_methods);
    const [shippingMethod,setShippingMethod] = useState({
        id :'flat_rate',
        title : 'Flat Rate',
        total: '10.00'
    })
    useEffect(()=>{
        dispatch(CommonAction.getAllShippingMethods('shipping_methods',{enabled : true}));
        onChange({
            method_id :'flat_rate',
            method_title : 'Flat Rate',
            total: '10.00'
        });
    },[])
    const [visible,setVisible] = useState(false);
    const renderItem = ({item}) => {
       return (
           <TouchableOpacity activeOpacity={0.5} style={styles.shippingOption} onPress={()=>{
               setVisible(!visible);
               setShippingMethod(item);
               onChange({
                   method_id : item.id,
                   method_title : item.title,
                   total: item.total
               });
           }}>
               <View style={styles.shippingOptionLogoLeft}>
                   <ShoppingCart/>
               </View>
               <View style={styles.shippingOptionInfo}>
                   <CommonText style={{
                       fontSize: ResponsiveUtil.font(16),
                       lineHeight: ResponsiveUtil.height(24),

                   }}>{item.title}</CommonText>
                   <CommonText style={{
                       fontSize: ResponsiveUtil.font(12),
                       lineHeight: ResponsiveUtil.height(20),
                       color: '#868686',

                   }}>2 -3 {lang.day}</CommonText>
               </View>
               <View style={styles.shippingOptionLogoRight}>

               </View>
           </TouchableOpacity>
       )
    }
    return (
        <>
            {
                shippingMethod !== undefined &&
                <View style={styles.shippingFee}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.shippingOption} onPress={()=>{
                        setVisible(!visible);
                    }}>
                        <View style={styles.shippingOptionLogoLeft}>
                            <ShoppingCart/>
                        </View>
                        <View style={styles.shippingOptionInfo}>
                            <CommonText style={{
                                fontSize: ResponsiveUtil.font(16),
                                lineHeight: ResponsiveUtil.height(24),

                            }}>{shippingMethod.title}</CommonText>
                            <CommonText style={{
                                fontSize: ResponsiveUtil.font(12),
                                lineHeight: ResponsiveUtil.height(20),
                                color: '#868686',

                            }}>2 -3 {lang.day}</CommonText>
                        </View>
                        <View style={styles.shippingOptionLogoRight}>
                            <CommonNumberFormat value={20000} style={[ {
                                fontSize: ResponsiveUtil.font(14)
                            }]}/>
                        </View>
                    </TouchableOpacity>
                </View>
            }
            <Modal
                isVisible={visible}
                backdropTransitionOutTiming={0}
                useNativeDriver={true}
                backdropOpacity={0.3}
                onBackdropPress={() => setVisible(false)}>
                <View style={{backgroundColor : 'white', justifyContent : 'center', alignItems : 'center'}}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        style={styles.list}
                        contentContainerStyle={{justifyContent : 'center', alignItems : 'center'}}
                    />
                </View>
            </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    shippingFee: {
        width: '100%',
        flexDirection: 'row',
        marginTop: ResponsiveUtil.height(24),
        height: ResponsiveUtil.height(24)
    },
    shippingOption: {
        flexDirection: 'row',
        borderRadius: ResponsiveUtil.width(30),
        marginTop: ResponsiveUtil.height(8),
        marginBottom: ResponsiveUtil.height(8),
        width: '100%',
        height: ResponsiveUtil.height(78),
        borderWidth: ResponsiveUtil.height(3),
        borderColor: '#F3F6F8',
    },
    shippingOptionLogoLeft: {
        width: ResponsiveUtil.width(72),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shippingOptionLogoRight: {
        width: ResponsiveUtil.width(72),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shippingOptionInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    list : {
        width :ResponsiveUtil.width(300),
        maxHeight : ResponsiveUtil.height(300)
    }
});
export default CommonShippingOption;
