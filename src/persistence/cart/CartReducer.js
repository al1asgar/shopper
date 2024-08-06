import _ from 'lodash';
import {CartConstants} from "./CartConstants";

const initialState = {
    status: '',
    data: {
        cart: [],
        paymentAmount: 0,
        itemCount: 0
    },
    error: {},
};

export function CartReducer(state = initialState, action) {
    switch (action.type) {
        case CartConstants.GET_CART_REQUEST:
            return {
                status: CartConstants.GET_CART_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CartConstants.GET_CART_SUCCESS:
            return {
                status: CartConstants.GET_CART_SUCCESS,
                data: {...state.data, ...{cart: action.data}},
                error: {},
            };
        case CartConstants.GET_CART_FAILURE:
            return {
                status: CartConstants.GET_CART_FAILURE,
                data: {...state.data, cart: []},
                error: action.data
            };
        case CartConstants.ADD_CART_ITEM_REQUEST:
            return {
                status: CartConstants.ADD_CART_ITEM_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CartConstants.ADD_CART_ITEM_SUCCESS:
            const cart = [...state.data.cart];
            const newItem = {...action.data};
            let {paymentAmount, itemCount} = {...state.data}

            const isUpdateOrInsert = _.findIndex(cart, function (item) {
                return item.id === newItem.id && item.selectedColor == newItem.selectedColor && item.selectedSize == newItem.selectedSize;
            });

            if (-1 === isUpdateOrInsert) {
                cart.push(newItem);
                paymentAmount += newItem.amount;
            } else {
                newItem.quantity = cart[isUpdateOrInsert].quantity + 1;
                paymentAmount += newItem.amount;
                newItem.amount += parseInt(cart[isUpdateOrInsert].amount);
                cart.splice(isUpdateOrInsert, 1, newItem);
            }
            itemCount += 1;
            return {
                status: CartConstants.ADD_CART_ITEM_SUCCESS,
                data: {...state.data, ...{cart: cart, paymentAmount: paymentAmount, itemCount: itemCount}},
                error: {},
            };
        case CartConstants.ADD_CART_ITEM_FAILURE:
            return {
                status: CartConstants.ADD_CART_ITEM_FAILURE,
                data: {...state.data},
                error: action.data
            };
        case CartConstants.UPDATE_CART_ITEM_REQUEST:
            return {
                status: CartConstants.UPDATE_CART_ITEM_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CartConstants.UPDATE_CART_ITEM_SUCCESS:
            const currentCart = [...state.data.cart];
            const updateItem = {...action.data};
            const isUpdate = _.findIndex(currentCart, function (item) {
                return item.id === updateItem.id && item.selectedColor == updateItem.selectedColor && item.selectedSize == updateItem.selectedSize;
            });
            updateItem.amount = parseInt(updateItem.price) * parseInt(updateItem.quantity);
            if (-1 === isUpdate) {
                currentCart.push(updateItem);
            } else {
                currentCart.splice(isUpdate, 1, updateItem);
            }
            let currentPaymentAmount = 0;
            let currentItemCount = 0;
            _.forEach(currentCart, function (item) {
                currentPaymentAmount += parseInt(item.amount);
                currentItemCount += parseInt(item.quantity);
            });
            return {
                status: CartConstants.UPDATE_CART_ITEM_SUCCESS,
                data: {
                    ...state.data, ...{
                        cart: currentCart,
                        paymentAmount: currentPaymentAmount,
                        itemCount: currentItemCount
                    }
                },
                error: {},
            };
        case CartConstants.UPDATE_CART_ITEM_FAILURE:
            return {
                status: CartConstants.UPDATE_CART_ITEM_FAILURE,
                data: {...state.data},
                error: action.data
            };
        case CartConstants.REMOVE_CART_ITEM_REQUEST:
            return {
                status: CartConstants.REMOVE_CART_ITEM_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CartConstants.REMOVE_CART_ITEM_SUCCESS:
            const beRemovedCart = [...state.data.cart];
            const deleteItem = {...action.data};
            _.remove(beRemovedCart, {
                id: deleteItem.id,
                selectedColor: deleteItem.selectedColor,
                selectedSize: deleteItem.selectedSize
            });
            let finalPaymentAmount = 0;
            let finalItemCount = 0;
            _.forEach(beRemovedCart, function (item) {
                finalPaymentAmount += parseInt(item.amount);
                finalItemCount += parseInt(item.quantity);
            });
            return {
                status: CartConstants.REMOVE_CART_ITEM_SUCCESS,
                data: {
                    ...state.data, ...{
                        cart: beRemovedCart,
                        paymentAmount: finalPaymentAmount,
                        itemCount: finalItemCount
                    }
                },
                error: {},
            };
        case CartConstants.REMOVE_CART_ITEM_FAILURE:
            return {
                status: CartConstants.REMOVE_CART_ITEM_FAILURE,
                data: {...state.data},
                error: action.data
            };
        case CartConstants.RESET_CART_REQUEST:
            return {
                status: CartConstants.RESET_CART_REQUEST,
                data: {...state.data},
                error: action.data
            };
        case CartConstants.RESET_CART_SUCCESS:
            return initialState;
        case CartConstants.RESET_CART_FAILURE:
            return {
                status: CartConstants.RESET_CART_FAILURE,
                data: {...state.data},
                error: action.data
            };
        default:
            return state;
    }
}
