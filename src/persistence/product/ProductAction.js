import {RequestConstant, ResponseConstant} from "../common/CommonConstant";
import {ProductConstants} from "./ProductConstants";
import {ProductService} from "./ProductService";

export const ProductAction = {
    getAllRecommendedProducts,
    getAllRelevantProducts,
    resetAllRelevantProducts,
    getAllProductsByCategory,
    resetAllProductsByCategory,
    getProductVariants,
    addWishListProduct,
    getWishListProducts,
    removeWishListProduct
};

function getAllRecommendedProducts(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(ProductConstants.GET_ALl_RECOMMENDED_PRODUCTS_REQUEST, data));
        const result = await ProductService.getAllProducts(url, data);
        dispatch(ResponseConstant(ProductConstants.GET_ALl_RECOMMENDED_PRODUCTS_SUCCESS, ProductConstants.GET_ALl_RECOMMENDED_PRODUCTS_FAILURE, result));
        return result;
    };
}

function getAllRelevantProducts(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(ProductConstants.GET_ALl_RELEVANT_PRODUCTS_REQUEST, data));
        const result = await ProductService.getAllProducts(url, data);
        dispatch(ResponseConstant(ProductConstants.GET_ALl_RELEVANT_PRODUCTS_SUCCESS, ProductConstants.GET_ALl_RELEVANT_PRODUCTS_FAILURE, result));
        return result;
    };
}
function resetAllRelevantProducts() {
    return async dispatch => {
        dispatch(RequestConstant(ProductConstants.RESET_ALl_RELEVANT_PRODUCTS, []));
    };
}
function getAllProductsByCategory(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(ProductConstants.GET_ALl_PRODUCTS_BY_CATEGORY_REQUEST, data));
        const result = await ProductService.getAllProducts(url, data);
        dispatch(ResponseConstant(ProductConstants.GET_ALl_PRODUCTS_BY_CATEGORY_SUCCESS, ProductConstants.GET_ALl_PRODUCTS_BY_CATEGORY_FAILURE, result));
        return result;
    };
}
function resetAllProductsByCategory() {
    return async dispatch => {
        dispatch(RequestConstant(ProductConstants.RESET_ALl_PRODUCTS_BY_CATEGORY, []));
    };
}
function getProductVariants(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(ProductConstants.GET_PRODUCT_VARIANTS_REQUEST, data));
        const result = await ProductService.getAllProducts(url, data);
        dispatch(ResponseConstant(ProductConstants.GET_PRODUCT_VARIANTS_SUCCESS, ProductConstants.GET_PRODUCT_VARIANTS_FAILURE, result));
        return result;
    };
}

function addWishListProduct(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(ProductConstants.ADD_WISHLIST_ITEM_REQUEST, data));
        const result = await ProductService.addWishListProduct(url, data);
        dispatch(ResponseConstant(ProductConstants.ADD_WISHLIST_ITEM_SUCCESS, ProductConstants.ADD_WISHLIST_ITEM_FAILURE, result));
    };
}
function removeWishListProduct(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(ProductConstants.REMOVE_WISHLIST_ITEM_REQUEST, data));
        const result = await ProductService.removeWishListProduct(url, data);
        dispatch(ResponseConstant(ProductConstants.REMOVE_WISHLIST_ITEM_SUCCESS, ProductConstants.REMOVE_WISHLIST_ITEM_FAILURE, result));
    };
}
function getWishListProducts(url, data) {
    return async dispatch => {
        dispatch(RequestConstant(ProductConstants.GET_WISHLIST_REQUEST, data));
        const result = await ProductService.getWishListProducts(url, data);
        dispatch(ResponseConstant(ProductConstants.GET_WISHLIST_SUCCESS, ProductConstants.GET_WISHLIST_FAILURE, result));
        return result;
    };
}
