import {RequestConstant, ResponseConstant} from "../common/CommonConstant";
import {CategoryConstants} from "./CategoryConstants";
import {CategoryService} from "./CategoryService";

export const CategoryAction = {
    getAllCategories,
};

function getAllCategories(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(CategoryConstants.GET_ALl_CATEGORIES_REQUEST, data));
        const result = await CategoryService.getAllCategories(url, data);
        dispatch(ResponseConstant(CategoryConstants.GET_ALl_CATEGORIES_SUCCESS, CategoryConstants.GET_ALl_CATEGORIES_FAILURE, result));
    };
}

