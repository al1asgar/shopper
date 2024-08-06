import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Constant} from './Constant';
import {useDispatch, useSelector} from 'react-redux';
import HTML from 'react-native-render-html';
import _ from 'lodash';
import CommonText from "../../component/common/CommonText";
import {ResponsiveUtil} from "../../util/ResponsiveUtil";
import Star from "../../component/icon/Star";
import CommonNumberFormat from "../../component/common/CommonNumberFormat";
import CommonLine from "../../component/common/CommonLine";
import Check from "../../component/icon/Check";
import {ColorUtil} from "../../util/ColorUtil";
import {ProductAction} from "../../persistence/product/ProductAction";
import AddWishlist from '../../component/icon/AddWishlist';
import Share from '../../component/icon/Share';

export default ({item, ...rest}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.UserReducer.data.user);
    const colorAttributes = useSelector(state => state.CommonReducer.data.colors);
    const {selectedColor, setSelectedColor, selectedSize, setSelectedSize, isVariantProduct} = {...rest};
    const lang = useSelector(state => state.LanguageReducer.language);
    let colors = _.find(item.attributes, function (o) {
        return o.name === 'color';
    });
    let sizes = _.find(item.attributes, function (o) {
        return o.name === 'size';
    });
    if (colors != null) {
        colors = colors.options;
    } else {
        setSelectedColor('SKIP');
    }
    if (sizes != null) {
        sizes = sizes.options;
    } else {
        setSelectedSize('SKIP');
    }

    useEffect(() => {
    }, []);
    return (
        <>
            <View style={styles.placeholder}></View>
            <View style={styles.body}>
                <View style={styles.top}>
                    <CommonText style={[{
                        fontSize: ResponsiveUtil.font(24),
                        lineHeight: ResponsiveUtil.width(32),
                    }]}>{item.name}</CommonText>
                    <View style={styles.rateAndPrice}>
                        <View style={styles.rate}>
                            <CommonText style={{fontSize: ResponsiveUtil.font(12)}}>{item.average_rating}</CommonText><CommonText style={{
                            fontSize: ResponsiveUtil.font(12),
                            fontWeight: '400',
                        }}> ({item.rating_count} {lang.reviews})</CommonText>
                            <Star style={{marginLeft: ResponsiveUtil.width(3), marginRight: ResponsiveUtil.width(3)}}/>
                            <Star style={{marginLeft: ResponsiveUtil.width(3), marginRight: ResponsiveUtil.width(3)}}/>
                            <Star style={{marginLeft: ResponsiveUtil.width(3), marginRight: ResponsiveUtil.width(3)}}/>
                            <Star style={{marginLeft: ResponsiveUtil.width(3), marginRight: ResponsiveUtil.width(3)}}/>
                            <Star style={{marginLeft: ResponsiveUtil.width(3), marginRight: ResponsiveUtil.width(3)}}/>
                        </View>
                        <CommonNumberFormat value={item.price} style={[{
                            fontSize: ResponsiveUtil.font(16),
                            lineHeight: ResponsiveUtil.width(20),
                        }]}/>
                    </View>
                </View>
            </View>
            {
                isVariantProduct && (
                    <CommonLine/> &&
                    <View style={styles.productAttributes}>
                        {
                            colors !== undefined && <View style={styles.productColor}>
                                <CommonText style={[{
                                    fontWeight: '700',
                                    letterSpacing: ResponsiveUtil.width(1),
                                }]}>{lang.availableColors}</CommonText>
                                <View style={styles.colors}>
                                    {
                                        _.map(colors, (item, index) => {
                                            let color = {};
                                            if(selectedColor === "Black"){
                                                color = {
                                                    color : 'white'
                                                }
                                            }
                                            return (
                                                <TouchableOpacity onPress={() => {
                                                    setSelectedColor(item);
                                                }} activeOpacity={0.9} style={[styles.color, {
                                                    backgroundColor: _.find(colorAttributes, function (c) {
                                                        return c.name === item;
                                                    }).description,
                                                }]} key={index.toString()}>
                                                    {
                                                        selectedColor === item && <Check {...color}/>
                                                    }
                                                </TouchableOpacity>
                                            );
                                        })
                                    }
                                </View>
                            </View>
                        }
                        {
                            sizes !== undefined && <View style={styles.productSize}>
                                <CommonText style={[{
                                    fontWeight: '700',
                                    letterSpacing: ResponsiveUtil.width(1),
                                }]}>{lang.size}</CommonText>
                                <View style={styles.sizes}>
                                    {
                                        _.map(sizes, (item, index) => {
                                            let size = ColorUtil.black;
                                            if (item === selectedSize) {
                                                size =ColorUtil.pink;
                                            }
                                            return (
                                                <TouchableOpacity onPress={() => {
                                                    setSelectedSize(item);
                                                }} style={[styles.size, {backgroundColor: size}]} key={index.toString()}>
                                                    <CommonText style={{color:'#fff'}}>{item}</CommonText>
                                                </TouchableOpacity>
                                            );
                                        })
                                    }
                                </View>
                            </View>
                        }
                    </View>
                )
            }

            <View style={styles.productDetailAndSharing}>
                <View style={styles.productDetailTitle}>
                    <CommonText style={{
                        fontSize: ResponsiveUtil.font(14),
                    }}>Product Details</CommonText>
                </View>
                <View style={styles.productDetailTitle}>
                    <TouchableOpacity style={{marginRight : ResponsiveUtil.width(5)}} onPress={()=>{

                    }}>
                        <Share/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        dispatch(ProductAction.addWishListProduct('/wishlist',{
                            key : user.loggedIn ? user.id : 'guest',
                            value : item
                        }));
                    }}>
                        <AddWishlist/>
                    </TouchableOpacity>

                </View>
            </View>
            <CommonLine/>
            <View style={styles.productDescription}>
                <HTML source={{ html: item.description }} baseFontStyle={{
                    fontSize: ResponsiveUtil.font(16),
                    color: '#000',
                }}/>
            </View>
        </>

    );
};
const styles = StyleSheet.create({
    body: {
        width: '100%',
        backgroundColor: '#fff',
        marginTop: ResponsiveUtil.height(24),

    },
    top: {
        width: '100%',
        minHeight: ResponsiveUtil.height(80),
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
    },
    placeholder: {
        height: Constant.HEADER_IMAGE_HEIGHT,
    },
    rateAndPrice: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: ResponsiveUtil.height(8),

    },
    rate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productAttributes: {
        width: ResponsiveUtil.width(330),
        marginLeft : ResponsiveUtil.width(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: ResponsiveUtil.width(15),
    },
    productColor: {
        flex :2,
        height: ResponsiveUtil.height(64),
    },
    productSize: {
        flex :1,
        height: ResponsiveUtil.height(64),
    },
    colors: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: ResponsiveUtil.width(16),
    },
    color: {
        width: ResponsiveUtil.width(32),
        height: ResponsiveUtil.height(32),
        marginRight: ResponsiveUtil.width(16),
        justifyContent: 'center',
        alignItems: 'center',
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: ResponsiveUtil.width(16),
    },
    size: {
        width: ResponsiveUtil.width(32),
        height: ResponsiveUtil.height(32),
        marginRight: ResponsiveUtil.width(16),
        justifyContent: 'center',
        alignItems: 'center',
    },
    productDetailAndSharing: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
        marginTop: ResponsiveUtil.height(32),
    },
    productDetailTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productDescription: {
        marginTop: ResponsiveUtil.height(8),
        paddingLeft: ResponsiveUtil.width(15),
        paddingRight: ResponsiveUtil.width(15),
    },
});
