import {Languages} from "../../module/language/lang";
import {LanguageConstants} from "./LanguageConstant";

const initialState = {
    language: Languages['EN'],
};

export function LanguageReducer(state = initialState, {type, language}) {
    switch (type) {
        case LanguageConstants.CHANGE_REQUEST:
            return {changing: true, language: Languages[language]};
        case LanguageConstants.CHANGE_SUCCESS:
            return {changed: true, language: Languages[language]};
        case LanguageConstants.CHANGE_FAILURE:
            return {};
        default:
            return state;
    }
}
