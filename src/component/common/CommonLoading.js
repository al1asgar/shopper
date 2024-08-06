import {StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import LottieView from 'lottie-react-native';
import {ResponsiveUtil} from "../../util/ResponsiveUtil";

class CommonLoading extends Component {
    static _ref = null;

    static setRef(ref = {}) {
        this._ref = ref;
    }

    static getRef() {
        return this._ref;
    }

    static clearRef() {
        this._ref = null;
    }
    constructor(props) {
        super(props);
        this.state = {
            show : false
        };
    }
    _setState(reducer) {
        return new Promise((resolve) => this.setState(reducer, () => resolve()));
    }
    show() {
        this._setState({show : true})

    }

    hide() {
        this._setState({show : false})
    }
    static show(){
        this._ref.show();
    }
    static hide(){
        this._ref.hide();
    }
    render() {
        const { show } = this.state;
        if(show){
            return (
                <View style={styles.container}>
                    <LottieView source={require('./loading.json')} autoPlay loop style={styles.loading}/>
                </View>
            );
        }
        return (
            <>
            </>
        )
    }

};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position : 'absolute',
        justifyContent : 'center',
        alignItems : 'center',
        zIndex : 999998,
        backgroundColor : 'rgba(0,0,0,0.4)'
    },
    loading : {
        zIndex : 999999,
        width : ResponsiveUtil.width(50),
        height : ResponsiveUtil.height(50)
    }

});
export default CommonLoading;
