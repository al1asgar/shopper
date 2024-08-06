import {CardConstants} from "./CardConstants";

const initialState = {
    status: '',
    data: {
        cards: [],
    },
    error: {},
};

export function CardReducer(state = initialState, action) {
    switch (action.type) {
        case CardConstants.GET_ALL_CARDS_REQUEST:
            return {
                status: CardConstants.GET_ALL_CARDS_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CardConstants.GET_ALL_CARDS_SUCCESS:
            return {
                status: CardConstants.GET_ALL_CARDS_SUCCESS,
                data: {...state.data, ...{cards: action.data}},
                error: {},
            };
        case CardConstants.GET_ALL_CARDS_FAILURE:
            return {
                status: CardConstants.GET_ALL_CARDS_FAILURE,
                data: {...state.data, cards: []},
                error: action.data,
            };
        case CardConstants.ADD_CARD_ITEM_REQUEST:
            return {
                status: CardConstants.ADD_CARD_ITEM_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CardConstants.ADD_CARD_ITEM_SUCCESS:
            return {
                status: CardConstants.ADD_CARD_ITEM_SUCCESS,
                data: {...state.data, ...{cards: action.data}},
                error: {},
            };
        case CardConstants.ADD_CARD_ITEM_FAILURE:
            return {
                status: CardConstants.ADD_CARD_ITEM_FAILURE,
                data: {...state.data},
                error: action.data,
            };
        case CardConstants.UPDATE_CARD_ITEM_REQUEST:
            return {
                status: CardConstants.UPDATE_CARD_ITEM_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CardConstants.UPDATE_CARD_ITEM_SUCCESS:
            return {
                status: CardConstants.UPDATE_CARD_ITEM_SUCCESS,
                data: {...state.data, ...{cards: action.data}},
                error: {},
            };
        case CardConstants.UPDATE_CARD_ITEM_FAILURE:
            return {
                status: CardConstants.UPDATE_CARD_ITEM_FAILURE,
                data: {...state.data},
                error: action.data,
            };
        case CardConstants.REMOVE_CARD_ITEM_REQUEST:
            return {
                status: CardConstants.REMOVE_CARD_ITEM_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CardConstants.REMOVE_CARD_ITEM_SUCCESS:
            return {
                status: CardConstants.REMOVE_CARD_ITEM_SUCCESS,
                data: {...state.data, ...{cards: action.data}},
                error: {},
            };
        case CardConstants.REMOVE_CARD_ITEM_FAILURE:
            return {
                status: CardConstants.REMOVE_CARD_ITEM_FAILURE,
                data: {...state.data},
                error: action.data,
            };
        default:
            return state;
    }
}
