/**
 * @author Suruchi Kaur Sihra
 * @file Api Service
 * @flow
 */

import Axios from 'axios';

/**
 * @description This functional component fetch data from API's and send response back to the calling function in their callbacks
 */
export const CallApi = async (method = "GET", endpoint, payload) => {

    let request;
    let headers = {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
    }

    method === "GET" ? request = { params: payload } : request = payload;

    const data = await Axios({
        method: method,
        url: endpoint,
        data: request,
        headers: headers
    }).then(response => {
        return response.data;
    }).catch(function (error) {
        console.log(error);
    });

    return data;
}