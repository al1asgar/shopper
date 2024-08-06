import {OrderConstant} from "./OrderConstant";

const initialState = {
    status: '',
    data: {
        orders: [],
        ongoingOrders : [],
        completeOrders : [],
        cancelledOrders : []
    },
    error: {},
};

export function OrderReducer(state = initialState, action) {
    switch (action.type) {
        case OrderConstant.CREATE_ORDER_REQUEST:
            return {
                status: OrderConstant.CREATE_ORDER_REQUEST,
                data: {...state.data},
                error: {},
            };
        case OrderConstant.CREATE_ORDER_SUCCESS:
            const orders = [...state.data.orders];
            orders.push(action.data);
            return {
                status: OrderConstant.CREATE_ORDER_SUCCESS,
                data: {...state.data,...{orders: orders}},
                error: {},
            };
        case OrderConstant.CREATE_ORDER_FAILURE:
            return {
                status: OrderConstant.CREATE_ORDER_FAILURE,
                data: {...state.data},
                error: action.data
            };
        case OrderConstant.GET_ALl_ONGOING_ORDERS_REQUEST:
            return {
                status: OrderConstant.GET_ALl_ONGOING_ORDERS_REQUEST,
                data: {...state.data},
                error: {},
            };
        case OrderConstant.GET_ALl_ONGOING_ORDERS_SUCCESS:
            return {
                status: OrderConstant.GET_ALl_ONGOING_ORDERS_SUCCESS,
                data: {...state.data,...{ongoingOrders: action.data}},
                error: {},
            };
        case OrderConstant.GET_ALl_ONGOING_ORDERS_FAILURE:
            return {
                status: OrderConstant.GET_ALl_ONGOING_ORDERS_FAILURE,
                data: {...state.data},
                error: action.data
            };
        case OrderConstant.GET_ALl_COMPLETE_ORDERS_REQUEST:
            return {
                status: OrderConstant.GET_ALl_COMPLETE_ORDERS_REQUEST,
                data: {...state.data},
                error: {},
            };
        case OrderConstant.GET_ALl_COMPLETE_ORDERS_SUCCESS:
            return {
                status: OrderConstant.GET_ALl_COMPLETE_ORDERS_SUCCESS,
                data: {...state.data,...{completeOrders: action.data}},
                error: {},
            };
        case OrderConstant.GET_ALl_COMPLETE_ORDERS_FAILURE:
            return {
                status: OrderConstant.GET_ALl_COMPLETE_ORDERS_FAILURE,
                data: {...state.data},
                error: action.data
            };
        case OrderConstant.GET_ALl_CANCELLED_ORDERS_REQUEST:
            return {
                status: OrderConstant.GET_ALl_CANCELLED_ORDERS_REQUEST,
                data: {...state.data},
                error: {},
            };
        case OrderConstant.GET_ALl_CANCELLED_ORDERS_SUCCESS:
            return {
                status: OrderConstant.GET_ALl_CANCELLED_ORDERS_SUCCESS,
                data: {...state.data,...{cancelledOrders: action.data}},
                error: {},
            };
        case OrderConstant.GET_ALl_CANCELLED_ORDERS_FAILURE:
            return {
                status: OrderConstant.GET_ALl_CANCELLED_ORDERS_FAILURE,
                data: {...state.data},
                error: action.data
            };
        default:
            return state;
    }
}
