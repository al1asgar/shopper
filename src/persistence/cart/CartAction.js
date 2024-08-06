import {RequestConstant, ResponseConstant} from "../common/CommonConstant";
import {CartConstants} from "./CartConstants";


export const CartAction = {
    addItem,
    removeItem,
    updateItem,
    resetCart,
};

function addItem(data) {
    return async dispatch => {
        dispatch(RequestConstant(CartConstants.ADD_CART_ITEM_REQUEST, data));
        const result = {
            success: true,
            data: data,
        };
        dispatch(ResponseConstant(CartConstants.ADD_CART_ITEM_SUCCESS, CartConstants.ADD_CART_ITEM_FAILURE, result));
    };
}

function removeItem(data) {
    return async dispatch => {
        dispatch(RequestConstant(CartConstants.REMOVE_CART_ITEM_REQUEST, data));
        const result = {
            success: true,
            data: data,
        };
        dispatch(ResponseConstant(CartConstants.REMOVE_CART_ITEM_SUCCESS, CartConstants.REMOVE_CART_ITEM_FAILURE, result));
    };
}

function updateItem(data) {
    return async dispatch => {
        dispatch(RequestConstant(CartConstants.UPDATE_CART_ITEM_REQUEST, data));
        const result = {
            success: true,
            data: data,
        };
        dispatch(ResponseConstant(CartConstants.UPDATE_CART_ITEM_SUCCESS, CartConstants.UPDATE_CART_ITEM_FAILURE, result));
    };
}

function resetCart(data) {
    return async dispatch => {
        dispatch(RequestConstant(CartConstants.RESET_CART_REQUEST, data));
        const result = {
            success: true,
            data: data,
        };
        dispatch(ResponseConstant(CartConstants.RESET_CART_SUCCESS, CartConstants.RESET_CART_FAILURE, result));
    };
}


