import React from 'react';
import _ from 'lodash'
import MyAsyncStorage from "../storage/MyAsyncStorage";
export const AddressService = {
    getAllAddresses,
    addOrUpdateAddress,
    removeAddress,
};

async function getAllAddresses() {
    let addresses = await MyAsyncStorage.getData('addresses');
    if(null === addresses){
        addresses = [];
    }
    return {
        success : true,
        data : addresses
    }
}

async function addOrUpdateAddress(data) {
    const {key, value} = data;
    let addresses = await MyAsyncStorage.getData('addresses');
    if(null === addresses){
        addresses = [value];
    }else{
        const isUpdateOrInsert = _.findIndex(addresses,function(o){
            return o.geoAddress.place_id === value.geoAddress.place_id;
        });
        if(-1 === isUpdateOrInsert){
            addresses.push(value);
        }else{
            addresses.splice(isUpdateOrInsert, 1, value);
        }
    }
    await MyAsyncStorage.storeData('addresses',addresses);
    return {
        success : true,
        data : addresses
    }
}
async function removeAddress(data) {
    const {key, place_id} = data;
    let addresses = await MyAsyncStorage.getData('addresses');
    if(null === addresses){
        addresses = [];
    }else{
        _.remove(addresses,{
            geoAddress : {
                place_id : place_id
            }
        });
    }
    await MyAsyncStorage.storeData('addresses',addresses);
    return {
        success : true,
        data : addresses
    }
}

