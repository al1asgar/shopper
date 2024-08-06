import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {LanguageReducer} from "../language/LanguageReducer";
import {UserReducer} from "../user/UserReducer";
import {CategoryReducer} from "../category/CategoryReducer";
import {ProductReducer} from "../product/ProductReducer";
import {CommonReducer} from "../common/CommonReducer";
import {CartReducer} from "../cart/CartReducer";
import {AddressReducer} from "../address/AddressReducer";
import {OrderReducer} from "../order/OrderReducer";
import {CardReducer} from "../card/CardReducer";


const allReducers = combineReducers({
    LanguageReducer,
    UserReducer,
    CategoryReducer,
    ProductReducer,
    CommonReducer,
    CartReducer,
    AddressReducer,
    OrderReducer,
    CardReducer

});
const applicationStore = createStore(allReducers, applyMiddleware(thunkMiddleware));
export default applicationStore;
