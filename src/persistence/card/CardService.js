import React from 'react';
import _ from 'lodash';
import MyAsyncStorage from "../storage/MyAsyncStorage";

export const CardService = {
    getAllCards,
    addCard,
    removeCard,
    updateCard
};

async function getAllCards(data) {
    let cardList = await MyAsyncStorage.getData("cards");
    if(null === cardList){
        cardList = [];
    }
    return {
        success : true,
        data : cardList
    }
}

async function addCard(data) {
    let cardList = await MyAsyncStorage.getData("cards");
    if(null === cardList){
        cardList = [data];
    }
    cardList.push(data);
    await MyAsyncStorage.storeData("cards",cardList);
    return {
        success : true,
        data : cardList
    }
}

async function removeCard( data) {
    let cardList = await MyAsyncStorage.getData("cards");
    if(null === cardList){
        cardList = [];
    }else{
        _.remove(cardList,{
            id : data.id
        });
    }
    await MyAsyncStorage.storeData("cards",cardList);
    return {
        success : true,
        data : cardList
    }
}
async function updateCard( data) {
    let cardList = await MyAsyncStorage.getData("cards");
    if(null === cardList){
        cardList = [];
    }else{
        const isUpdateOrInsert = _.findIndex(cardList,function(item){
            return item.id === data.id;
        })
        cardList.splice(isUpdateOrInsert, 1, data);
    }
    await MyAsyncStorage.storeData("cards",cardList);
    return {
        success : true,
        data : cardList
    }
}
