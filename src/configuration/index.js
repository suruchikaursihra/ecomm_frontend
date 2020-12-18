/**
 * @author SURUCHI KAUR SIHRA
 * @description config url for backend apis
 * @file Api Config File
 * @flow
 */

var SERVER = {
    LOCAL: "http://localhost:8000",
};

var BASE_URL = SERVER.LOCAL;

const CONFIG = {
    login: `${BASE_URL}/api/login`,
    getTestsList: `${BASE_URL}/api/getTestsList`,
    searchTestsList: `${BASE_URL}/api/searchTestsList`,
    placeOrder: `${BASE_URL}/api/placeOrder`,
    saveToRedis: `${BASE_URL}/api/saveToRedis`,
    removeFromRedis: `${BASE_URL}/api/removeFromRedis`,
    resetRedis: `${BASE_URL}/api/resetRedis`,
};

export default CONFIG;

