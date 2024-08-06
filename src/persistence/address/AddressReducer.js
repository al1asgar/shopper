import {AddressConstants} from "./AddressConstants";


const initialState = {
    status: '',
    data: {
        addresses: [],
    },
    error: {},
};

export function AddressReducer(state = initialState, action) {
    switch (action.type) {
        case AddressConstants.GET_ADDRESS_REQUEST:
            return {
                status: AddressConstants.GET_ADDRESS_REQUEST,
                data: {...state.data},
                error: {},
            };
        case AddressConstants.GET_ADDRESS_SUCCESS:
            return {
                status: AddressConstants.GET_ADDRESS_SUCCESS,
                data: {...state.data, ...{addresses: action.data}},
                error: {},
            };
        case AddressConstants.GET_ADDRESS_FAILURE:
            return {
                status: AddressConstants.GET_ADDRESS_FAILURE,
                data: {...state.data, addresses: []},
                error: action.data,
            };
        case AddressConstants.ADD_ADDRESS_REQUEST:
            return {
                status: AddressConstants.ADD_ADDRESS_REQUEST,
                data: {...state.data},
                error: {},
            };
        case AddressConstants.ADD_ADDRESS_SUCCESS:
            return {
                status: AddressConstants.ADD_ADDRESS_SUCCESS,
                data: {...state.data, ...{addresses: action.data}},
                error: {},
            };
        case AddressConstants.ADD_ADDRESS_FAILURE:
            return {
                status: AddressConstants.ADD_ADDRESS_FAILURE,
                data: {...state.data},
                error: action.data,
            };
        case AddressConstants.REMOVE_ADDRESS_REQUEST:
            return {
                status: AddressConstants.REMOVE_ADDRESS_REQUEST,
                data: {...state.data},
                error: {},
            };
        case AddressConstants.REMOVE_ADDRESS_SUCCESS:
            return {
                status: AddressConstants.REMOVE_ADDRESS_SUCCESS,
                data: {...state.data, ...{addresses: action.data}},
                error: {},
            };
        case AddressConstants.REMOVE_ADDRESS_FAILURE:
            return {
                status: AddressConstants.REMOVE_ADDRESS_FAILURE,
                data: {...state.data},
                error: action.data,
            };
        default:
            return state;
    }
}
