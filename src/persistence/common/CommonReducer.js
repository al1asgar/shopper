
import _ from 'lodash';
import {CommonConstants} from "./CommonConstant";
const initialState = {
    status: '',
    data: {
        colors: {},
        sizes : {},
        woocommerce_current_currency: {},
        woocommerce_allowed_countries : {},
        woocommerce_all_except_countries : {},
        woocommerce_specific_allowed_countries : {},
        woocommerce_ship_to_countries : {},
        woocommerce_specific_ship_to_countries : {},
        woocommerce_default_customer_address : {},
        woocommerce_calc_taxes : {},
        woocommerce_demo_store : {},
        woocommerce_demo_store_notice : {},
        woocommerce_currency : {},
        woocommerce_currency_pos:{},
        woocommerce_price_thousand_sep : {},
        woocommerce_price_decimal_sep : {},
        woocommerce_price_num_decimals : {},
        shipping_methods : [],
        supporters : []

    },
    error: {},
};

export function CommonReducer(state = initialState, action) {
    switch (action.type) {
        case CommonConstants.GET_ALl_COLORS_REQUEST:
            return {
                status: CommonConstants.GET_ALl_COLORS_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CommonConstants.GET_ALl_COLORS_SUCCESS:
            return {
                status: CommonConstants.GET_ALl_COLORS_SUCCESS,
                data: {...state.data,...{colors: action.data}},
                error: {},
            };
        case CommonConstants.GET_ALl_COLORS_FAILURE:
            return {
                status: CommonConstants.GET_ALl_COLORS_FAILURE,
                data: {...state.data},
                error: action.data
            };
        case CommonConstants.GET_ALl_SIZES_REQUEST:
            return {
                status: CommonConstants.GET_ALl_SIZES_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CommonConstants.GET_ALl_SIZES_SUCCESS:

            return {
                status: CommonConstants.GET_ALl_SIZES_SUCCESS,
                data: {...state.data,...{sizes: action.data}},
                error: {},
            };
        case CommonConstants.GET_ALl_SIZES_FAILURE:
            return {
                status: CommonConstants.GET_ALl_SIZES_FAILURE,
                data: {...state.data},
                error: action.data
            };
        case CommonConstants.GET_ALl_SETTINGS_REQUEST:
            return {
                status: CommonConstants.GET_ALl_SETTINGS_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CommonConstants.GET_ALl_SETTINGS_SUCCESS:
            const settings = {}
            _.forIn(action.data, function(value, key) {
                settings[value.id] = value;
            });
            return {
                status: CommonConstants.GET_ALl_SETTINGS_SUCCESS,
                data: {...state.data,...settings},
                error: {},
            };
        case CommonConstants.GET_ALl_SETTINGS_FAILURE:
            return {
                status: CommonConstants.GET_ALl_SETTINGS_FAILURE,
                data: {...state.data},
                error: action.data
            };
        case CommonConstants.GET_CURRENT_CURRENCY_REQUEST:
            return {
                status: CommonConstants.GET_CURRENT_CURRENCY_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CommonConstants.GET_CURRENT_CURRENCY_SUCCESS:
            return {
                status: CommonConstants.GET_CURRENT_CURRENCY_SUCCESS,
                data: {...state.data,...{woocommerce_current_currency : action.data}},
                error: {},
            };
        case CommonConstants.GET_CURRENT_CURRENCY_FAILURE:
            return {
                status: CommonConstants.GET_CURRENT_CURRENCY_FAILURE,
                data: {...state.data},
                error: action.data
            };

        case CommonConstants.GET_ALL_SHIPPING_METHODS_REQUEST:
            return {
                status: CommonConstants.GET_ALL_SHIPPING_METHODS_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CommonConstants.GET_ALL_SHIPPING_METHODS_SUCCESS:
            return {
                status: CommonConstants.GET_ALL_SHIPPING_METHODS_SUCCESS,
                data: {...state.data,...{shipping_methods : action.data}},
                error: {},
            };
        case CommonConstants.GET_ALL_SHIPPING_METHODS_FAILURE:
            return {
                status: CommonConstants.GET_ALL_SHIPPING_METHODS_FAILURE,
                data: {...state.data},
                error: action.data
            };


        case CommonConstants.GET_ALl_SUPPORTERS_REQUEST:
            return {
                status: CommonConstants.GET_ALl_SUPPORTERS_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CommonConstants.GET_ALl_SUPPORTERS_SUCCESS:
            action.data = _.map(action.data,function(o){
               return o.email;
            });
            return {
                status: CommonConstants.GET_ALl_SUPPORTERS_SUCCESS,
                data: {...state.data,...{supporters : action.data}},
                error: {},
            };
        case CommonConstants.GET_ALl_SUPPORTERS_FAILURE:
            return {
                status: CommonConstants.GET_ALl_SUPPORTERS_FAILURE,
                data: {...state.data},
                error: action.data
            };
        default:
            return state;
    }
}
