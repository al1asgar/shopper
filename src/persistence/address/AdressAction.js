import {RequestConstant, ResponseConstant} from "../common/CommonConstant";
import {AddressConstants} from "./AddressConstants";
import {AddressService} from "./AddressService";


export const AddressAction = {
    getAllAddresses,
    addOrUpdateAddress,
    removeAddress,
};
function getAllAddresses(data) {
    return async dispatch => {
        dispatch(RequestConstant(AddressConstants.GET_ADDRESS_REQUEST, data));
        const result = await AddressService.getAllAddresses();
        dispatch(ResponseConstant(AddressConstants.GET_ADDRESS_SUCCESS, AddressConstants.GET_ADDRESS_FAILURE, result));
    };
}
function addOrUpdateAddress(data) {
    return async dispatch => {
        dispatch(RequestConstant(AddressConstants.ADD_ADDRESS_REQUEST, data));
        const result = await AddressService.addOrUpdateAddress(data);
        dispatch(ResponseConstant(AddressConstants.ADD_ADDRESS_SUCCESS, AddressConstants.ADD_ADDRESS_FAILURE, result));
    };
}

function removeAddress(data) {
    return async dispatch => {
        dispatch(RequestConstant(AddressConstants.REMOVE_ADDRESS_REQUEST, data));
        const result = await AddressService.removeAddress(data);
        dispatch(ResponseConstant(AddressConstants.REMOVE_ADDRESS_SUCCESS, AddressConstants.REMOVE_ADDRESS_FAILURE, result));
    };
}
