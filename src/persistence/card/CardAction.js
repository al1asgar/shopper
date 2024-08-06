import {RequestConstant, ResponseConstant} from "../common/CommonConstant";
import {CardConstants} from "./CardConstants";
import {CardService} from "./CardService";


export const CardAction = {
    findAllItems,
    addItem,
    removeItem,
    updateItem,
    resetCart,
};
function findAllItems(data) {
    return async dispatch => {
        dispatch(RequestConstant(CardConstants.GET_ALL_CARDS_REQUEST, data));
        const result = await CardService.getAllCards({});
        dispatch(ResponseConstant(CardConstants.GET_ALL_CARDS_SUCCESS, CardConstants.GET_ALL_CARDS_FAILURE, result));
    };
}
function addItem(data) {
    return async dispatch => {
        dispatch(RequestConstant(CardConstants.ADD_CARD_ITEM_REQUEST, data));
        const result = await CardService.addCard(data);
        dispatch(ResponseConstant(CardConstants.ADD_CARD_ITEM_SUCCESS, CardConstants.ADD_CARD_ITEM_FAILURE, result));
    };
}

function removeItem(data) {
    return async dispatch => {
        dispatch(RequestConstant(CardConstants.REMOVE_CARD_ITEM_REQUEST, data));
        const result = await CardService.removeCard(data);
        dispatch(ResponseConstant(CardConstants.REMOVE_CARD_ITEM_SUCCESS, CardConstants.REMOVE_CARD_ITEM_FAILURE, result));
    };
}

function updateItem(data) {
    return async dispatch => {
        dispatch(RequestConstant(CardConstants.UPDATE_CARD_ITEM_REQUEST, data));
        const result = await CardService.updateCard(data);
        dispatch(ResponseConstant(CardConstants.UPDATE_CARD_ITEM_SUCCESS, CardConstants.UPDATE_CARD_ITEM_FAILURE, result));
    };
}

function resetCart(data) {
    return async dispatch => {
        dispatch(RequestConstant(CardConstants.RESET_CARD_REQUEST, data));
        const result = {
            success: true,
            data: data,
        };
        dispatch(ResponseConstant(CardConstants.RESET_CARD_SUCCESS, CardConstants.RESET_CARD_FAILURE, result));
    };
}


