
import {Html5Entities} from 'html-entities';
import {CommonConstants, RequestConstant, ResponseConstant} from "./CommonConstant";
import {CommonService} from "./CommonService";

export const CommonAction = {
    getAllColors,
    getAllSizes,
    getAllSettings,
    getCurrentCurrency,
    getAllShippingMethods,
    getAllSupporters
};

function getAllColors(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(CommonConstants.GET_ALl_COLORS_REQUEST, data));
        const result = await CommonService.getAllColors(url, data);
        dispatch(ResponseConstant(CommonConstants.GET_ALl_COLORS_SUCCESS, CommonConstants.GET_ALl_COLORS_FAILURE, result));
    };
}

function getAllSizes(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(CommonConstants.GET_ALl_SIZES_REQUEST, data));
        const result = await CommonService.getAllSizes(url, data);
        dispatch(ResponseConstant(CommonConstants.GET_ALl_SIZES_SUCCESS, CommonConstants.GET_ALl_SIZES_FAILURE, result));
    };
}

function getAllSettings(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(CommonConstants.GET_ALl_SETTINGS_REQUEST, data));
        const result = await CommonService.getAllSettings(url, data);
        dispatch(ResponseConstant(CommonConstants.GET_ALl_SETTINGS_SUCCESS, CommonConstants.GET_ALl_SETTINGS_FAILURE, result));
    };
}

function getCurrentCurrency(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(CommonConstants.GET_CURRENT_CURRENCY_REQUEST, data));
        const result = await CommonService.getCurrentCurrency(url, data);
        const htmlEntities = new Html5Entities();
        result.data.symbol = htmlEntities.decode(result.data.symbol);
        dispatch(ResponseConstant(CommonConstants.GET_CURRENT_CURRENCY_SUCCESS, CommonConstants.GET_CURRENT_CURRENCY_FAILURE, result));
    };
}

function getAllShippingMethods(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(CommonConstants.GET_ALL_SHIPPING_METHODS_REQUEST, data));
        const result = await CommonService.getAllShippingMethods(url, data);
        dispatch(ResponseConstant(CommonConstants.GET_ALL_SHIPPING_METHODS_SUCCESS, CommonConstants.GET_ALL_SHIPPING_METHODS_FAILURE, result));
    };
}
function getAllSupporters(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(CommonConstants.GET_ALl_SUPPORTERS_REQUEST, data));
        const result = await CommonService.getAllSupporters(url, data);
        dispatch(ResponseConstant(CommonConstants.GET_ALl_SUPPORTERS_SUCCESS, CommonConstants.GET_ALl_SUPPORTERS_FAILURE, result));
    };
}

