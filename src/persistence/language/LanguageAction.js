import {LanguageConstants} from "./LanguageConstant";
import {LanguageService} from "./LanguageService";

export const LanguageAction = {change};

function change(language) {
    return async dispatch => {
        await LanguageService.setLanguage(language);
        return dispatch({type: LanguageConstants.CHANGE_SUCCESS, language : language.key});
    };

}
