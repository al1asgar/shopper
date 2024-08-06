import WooCommerceAPI from 'react-native-woocommerce-api';
import {ApplicationProperties} from "../../application.properties";

let wooCommerceAPI = new WooCommerceAPI({
    url: ApplicationProperties.apiUrl, // Your store URL
    ssl: true,
    consumerKey: ApplicationProperties.consumerKey, // Your consumer secret
    consumerSecret: ApplicationProperties.consumerSecret, // Your consumer secret
    wpAPI: true, // Enable the WP REST API integration
    version: 'wc/v3', // WooCommerce WP REST API version
    queryStringAuth: true,
});
const put = async (url, data) => {
    try {
        let response = await wooCommerceAPI.put(url, data);
        if (response.data !== undefined && response.data.status) {
            return {
                success: false,
                data: response,
            };
        } else {
            return {
                success: true,
                data: response,
            };
        }

    } catch (e) {
        return {
            success: false,
            data: e,
        };
    }


};
const post = async (url, data, loading) => {
    try {
        let response = await wooCommerceAPI.post(url, data);
        if (response.data !== undefined && response.data.status) {
            return {
                success: false,
                data: response,
            };
        } else {
            return {
                success: true,
                data: response,
            };
        }

    } catch (e) {
        return {
            success: false,
            data: e,
        };
    }


};
const get = async (url, data, loading) => {
    if (loading) {
        //CommonLoading.show();
    }
    try {
        let response = await wooCommerceAPI.get(url, data);
        if (response.data !== undefined && response.data.status) {
            return {
                success: false,
                data: response,
            };
        } else {
            return {
                success: true,
                data: response,
            };
        }
    } catch (e) {
        console.log(e)
        return {
            success: false,
            data: e,
        };
    } finally {
        if (loading) {
            //CommonLoading.hide();
        }
    }
};
export const api = {
    post,
    get,
    put
};

