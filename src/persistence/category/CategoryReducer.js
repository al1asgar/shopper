import {CategoryConstants} from "./CategoryConstants";

const initialState = {
    status: '',
    data: {
        categories: []
    },
    error: {},
};

export function CategoryReducer(state = initialState, action) {
    switch (action.type) {
        case CategoryConstants.GET_ALl_CATEGORIES_REQUEST:
            return {
                status: CategoryConstants.GET_ALl_CATEGORIES_REQUEST,
                data: {...state.data},
                error: {},
            };
        case CategoryConstants.GET_ALl_CATEGORIES_SUCCESS:
            return {
                status: CategoryConstants.GET_ALl_CATEGORIES_SUCCESS,
                data: {...state.data,...{categories: action.data}},
                error: {},
            };
        case CategoryConstants.GET_ALl_CATEGORIES_FAILURE:
            return {
                status: CategoryConstants.GET_ALl_CATEGORIES_FAILURE,
                data: {categories : []},
                error: action.data
            };
        default:
            return state;
    }
}
