import React from 'react';
import {api} from '../../module/api/CommonAPI';

import _ from 'lodash'
import MyAsyncStorage from "../storage/MyAsyncStorage";
export const ProductService = {
    getAllProducts,
    addWishListProduct,
    getWishListProducts,
    removeWishListProduct
};

async function getAllProducts(url, data, loading) {
    return await api.get(url, data, loading);
}

async function addWishListProduct(url, data) {
    const {key, value} = data;
    let wishlist = await MyAsyncStorage.getData(key);
    if(null === wishlist){
        wishlist = [value];
    }else{
        const existingProduct = _.find(wishlist,function(o){
            return o.id === value.id;
        });
        if(undefined === existingProduct){
            wishlist.push(value);
        }
    }
    await MyAsyncStorage.storeData(key,wishlist);
    return {
        success : true,
        data : wishlist
    }
}
async function removeWishListProduct(url, data) {
    const {key, id} = data;
    let wishlist = await MyAsyncStorage.getData(key);
    if(null === wishlist){
        wishlist = [];
    }else{
        _.remove(wishlist,{
            id : id
        });
    }
    await MyAsyncStorage.storeData(key,wishlist);
    return {
        success : true,
        data : wishlist
    }
}
async function getWishListProducts(url, data) {
    let wishlist = await MyAsyncStorage.getData(data);
    if(null === wishlist){
        wishlist = [];
    }
    return {
        success : true,
        data : wishlist
    }
}
