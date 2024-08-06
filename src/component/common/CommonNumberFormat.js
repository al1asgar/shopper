import React from 'react';
import CommonText from './CommonText';
import NumberFormat from "react-number-format";
import {useSelector} from 'react-redux';

const CommonNumberFormat = ({...rest}) => {
    const currency = useSelector(state => state.CommonReducer.data.woocommerce_current_currency.symbol);
    const woocommerce_price_thousand_sep = useSelector(state => state.CommonReducer.data.woocommerce_price_thousand_sep.value);
    const woocommerce_price_decimal_sep = useSelector(state => state.CommonReducer.data.woocommerce_price_decimal_sep.value);
    const woocommerce_currency_pos = useSelector(state => state.CommonReducer.data.woocommerce_currency_pos.value);
    let currencyPos = {
        prefix: currency
    }
    if (woocommerce_currency_pos === "right") {
        currencyPos = {
            suffix: currency
        }
    }
    const {style} = {...rest};
    return (
        <NumberFormat
            {...rest}
            displayType={'text'}
            thousandSeparator={woocommerce_price_thousand_sep}
            decimalSeparator={woocommerce_price_decimal_sep}
            {...currencyPos}
            renderText={value => (
                <CommonText numberOfLines={1} style={[style]}>{value}</CommonText>
            )}
        />
    );
};

export default CommonNumberFormat;
