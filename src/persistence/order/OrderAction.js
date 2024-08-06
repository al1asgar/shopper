import {RequestConstant, ResponseConstant} from "../common/CommonConstant";
import {OrderService} from "./OrderService";
import {OrderConstant} from "./OrderConstant";


export const OrderAction = {
    createOrder,
    getAllOnGoingOrders,
    getAllCompleteOrders,
    getAllCancelledOrders
};

function createOrder(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(OrderConstant.CREATE_ORDER_REQUEST, data));
        const result = await OrderService.creatOrder(url,data);
        dispatch(ResponseConstant(OrderConstant.CREATE_ORDER_SUCCESS, OrderConstant.CREATE_ORDER_FAILURE, result));
        return result;
    };
}
function getAllOnGoingOrders(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(OrderConstant.GET_ALl_ONGOING_ORDERS_REQUEST, data));
        const result = await OrderService.getOrders(url,data);
        dispatch(ResponseConstant(OrderConstant.GET_ALl_ONGOING_ORDERS_SUCCESS, OrderConstant.GET_ALl_ONGOING_ORDERS_FAILURE, result));
    };
}

function getAllCompleteOrders(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(OrderConstant.GET_ALl_COMPLETE_ORDERS_REQUEST, data));
        const result = await OrderService.getOrders(url,data);
        dispatch(ResponseConstant(OrderConstant.GET_ALl_COMPLETE_ORDERS_SUCCESS, OrderConstant.GET_ALl_COMPLETE_ORDERS_FAILURE, result));
    };
}

function getAllCancelledOrders(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(OrderConstant.GET_ALl_CANCELLED_ORDERS_REQUEST, data));
        const result = await OrderService.getOrders(url,data);
        dispatch(ResponseConstant(OrderConstant.GET_ALl_CANCELLED_ORDERS_SUCCESS, OrderConstant.GET_ALl_CANCELLED_ORDERS_FAILURE, result));
    };
}


