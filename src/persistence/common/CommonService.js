import React from 'react';
import {api} from "../../module/api/CommonAPI";


export const CommonService = {
    getAllColors,
    getAllSizes,
    getAllSettings,
    getCurrentCurrency,
    getAllShippingMethods,
    getAllSupporters
};

async function getAllColors(url, data) {
    return await api.get(url, data);
}

async function getAllSizes(url, data) {
    return await api.get(url, data);
}

async function getAllSettings(url, data) {
    return await api.get(url, data);
}

async function getCurrentCurrency(url, data) {
    return await api.get(url, data);
}

async function getAllShippingMethods(url, data) {
    return await api.get(url, data);
}

async function getAllSupporters(url, data) {
    return await api.get(url, data);
}
