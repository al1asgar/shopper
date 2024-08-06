import React from 'react';
import jwt_decode from 'jwt-decode';
import {api} from '../../module/api/CommonAPI';
import {ApplicationProperties} from '../../application.properties';
import axios from 'axios';

export const UserService = {
    signIn,
    signUp,
    signOut,
    updateProfile

};

async function signIn(url, data) {
    try {
        const response = await axios.post(ApplicationProperties.loginUrl, data);
        const responseData = response.data;
        if (responseData && responseData.success) {
            let decoded = jwt_decode(responseData.data.jwt);
            const result = await api.post(url + '/' + decoded.id, {id: decoded.id});
            return result;
        }
        return {
            success: false,
            data: {},
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            data: e,
        };
    }
}

async function signUp(url, data) {
    const result = await api.post(url, data);
    return result;
}
async function updateProfile(url, data) {
    const result = await api.put(url, data);
    return result;
}
async function signOut() {
    return await api.post('/signout', {});
}
