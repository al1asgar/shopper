import React from 'react';
import {api} from "../../module/api/CommonAPI";

export const CategoryService = {
    getAllCategories,
};

async function getAllCategories(url, data) {
    return await api.get(url, data);
}
