import React from 'react';
import {api} from '../../module/api/CommonAPI';

export const OrderService = {
    creatOrder,
    getOrders,
};

async function creatOrder(url, data, loading) {
    return await api.post(url, data, loading);
}

async function getOrders(url, data, loading) {
    return await api.get(url, data, loading);
}
