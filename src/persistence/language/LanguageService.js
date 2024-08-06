import React from 'react';
import MyAsyncStorage from "../storage/MyAsyncStorage";

export const LanguageService = {
    setLanguage,
    getLanguage
};

async function getLanguage() {
    let lang = await MyAsyncStorage.getData('lang');
    if (null === lang) {
        lang = {
            key : 'EN'
        };
    }
    return lang;
}
async function setLanguage(langCd) {
    await  MyAsyncStorage.storeData('lang',langCd)
}
