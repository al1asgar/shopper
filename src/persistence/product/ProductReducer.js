import {ProductConstants} from "./ProductConstants";


const initialState = {
    status: '',
    data: {
        recommended : [],
        relevantProducts : [],
        productsByCategory : [],
        productVariants : [],
        wishlistProducts : []
    },
    error: {},
};

export function ProductReducer(state = initialState, action) {
    switch (action.type) {
        case ProductConstants.GET_ALl_RECOMMENDED_PRODUCTS_REQUEST:
            return {
                status: ProductConstants.GET_ALl_RECOMMENDED_PRODUCTS_REQUEST,
                data: {...state.data},
                error: {},
            };
        case ProductConstants.GET_ALl_RECOMMENDED_PRODUCTS_SUCCESS:
            return {
                status: ProductConstants.GET_ALl_RECOMMENDED_PRODUCTS_SUCCESS,
                data: {...state.data,...{recommended:[...state.data.recommended,...action.data]}},
                error: {},
            };
        case ProductConstants.GET_ALl_RECOMMENDED_PRODUCTS_FAILURE:
            return {
                status: ProductConstants.GET_ALl_RECOMMENDED_PRODUCTS_FAILURE,
                data: {...state.data,recommended : []},
                error: action.data
            };
        case ProductConstants.GET_ALl_RELEVANT_PRODUCTS_REQUEST:
            return {
                status: ProductConstants.GET_ALl_RELEVANT_PRODUCTS_REQUEST,
                data: {...state.data},
                error: {},
            };
        case ProductConstants.GET_ALl_RELEVANT_PRODUCTS_SUCCESS:
            return {
                status: ProductConstants.GET_ALl_RELEVANT_PRODUCTS_SUCCESS,
                data: {...state.data,...{relevantProducts:[...state.data.relevantProducts,...action.data]}},
                error: {},
            };
        case ProductConstants.GET_ALl_RELEVANT_PRODUCTS_FAILURE:
            return {
                status: ProductConstants.GET_ALl_RELEVANT_PRODUCTS_FAILURE,
                data: {...state.data},
                error: action.data
            };
        case ProductConstants.GET_ALl_PRODUCTS_BY_CATEGORY_REQUEST:
            return {
                status: ProductConstants.GET_ALl_PRODUCTS_BY_CATEGORY_REQUEST,
                data: {...state.data},
                error: {},
            };
        case ProductConstants.GET_ALl_PRODUCTS_BY_CATEGORY_SUCCESS:
            return {
                status: ProductConstants.GET_ALl_PRODUCTS_BY_CATEGORY_SUCCESS,
                data: {...state.data,...{productsByCategory: [...state.data.productsByCategory,...action.data]}},
                error: {},
            };
        case ProductConstants.GET_ALl_PRODUCTS_BY_CATEGORY_FAILURE:
            return {
                status: ProductConstants.GET_ALl_PRODUCTS_BY_CATEGORY_FAILURE,
                data: {...state.data},
                error: action.data
            };
        case ProductConstants.RESET_ALl_PRODUCTS_BY_CATEGORY:
            return {
                status: ProductConstants.RESET_ALl_PRODUCTS_BY_CATEGORY,
                data: {...state.data,...{productsByCategory: []}},
                error: {},
            };
        case ProductConstants.GET_PRODUCT_VARIANTS_REQUEST:
            return {
                status: ProductConstants.GET_PRODUCT_VARIANTS_REQUEST,
                data: {...state.data,productVariants : []},
                error: {},
            };
        case ProductConstants.GET_PRODUCT_VARIANTS_SUCCESS:
            return {
                status: ProductConstants.GET_PRODUCT_VARIANTS_SUCCESS,
                data: {...state.data,...{productVariants: action.data}},
                error: {},
            };
        case ProductConstants.GET_PRODUCT_VARIANTS_FAILURE:
            return {
                status: ProductConstants.GET_PRODUCT_VARIANTS_FAILURE,
                data: {...state.data},
                error: action.data
            };
        case ProductConstants.RESET_ALl_RELEVANT_PRODUCTS:
            return {
                status: ProductConstants.RESET_ALl_RELEVANT_PRODUCTS,
                data: {...state.data,...{relevantProducts: []}},
                error: {},
            };
        case ProductConstants.ADD_WISHLIST_ITEM_REQUEST:
            return {
                status: ProductConstants.ADD_WISHLIST_ITEM_REQUEST,
                data: {...state.data},
                error: {},
            };
        case ProductConstants.ADD_WISHLIST_ITEM_SUCCESS:
            return {
                status: ProductConstants.ADD_WISHLIST_ITEM_SUCCESS,
                data: {...state.data,...{wishlistProducts: action.data}},
                error: {},
            };
        case ProductConstants.ADD_WISHLIST_ITEM_FAILURE:
            return {
                status: ProductConstants.ADD_WISHLIST_ITEM_FAILURE,
                data: {...state.data},
                error: action.data
            };

        case ProductConstants.GET_WISHLIST_REQUEST:
            return {
                status: ProductConstants.GET_WISHLIST_REQUEST,
                data: {...state.data},
                error: {},
            };
        case ProductConstants.GET_WISHLIST_SUCCESS:
            return {
                status: ProductConstants.GET_WISHLIST_SUCCESS,
                data: {...state.data,...{wishlistProducts: action.data}},
                error: {},
            };
        case ProductConstants.GET_WISHLIST_FAILURE:
            return {
                status: ProductConstants.GET_WISHLIST_FAILURE,
                data: {...state.data},
                error: action.data
            };

        case ProductConstants.REMOVE_WISHLIST_ITEM_REQUEST:
            return {
                status: ProductConstants.REMOVE_WISHLIST_ITEM_REQUEST,
                data: {...state.data},
                error: {},
            };
        case ProductConstants.REMOVE_WISHLIST_ITEM_SUCCESS:
            return {
                status: ProductConstants.REMOVE_WISHLIST_ITEM_SUCCESS,
                data: {...state.data,...{wishlistProducts: action.data}},
                error: {},
            };
        case ProductConstants.REMOVE_WISHLIST_ITEM_FAILURE:
            return {
                status: ProductConstants.REMOVE_WISHLIST_ITEM_FAILURE,
                data: {...state.data},
                error: action.data
            };
        default:
            return state;
    }
}
