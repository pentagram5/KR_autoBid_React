import React, {useEffect, useState, useReducer} from 'react';
import PowerLinkKeywordPresenter from "./PowerLinkKeywordPresenter";
import axios from "axios";
import * as constants from "../../utils/constants";
import {toast} from "react-toastify";
import SendRequest from "../../utils/SendRequest";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

// const fetchPowerLinkData = async customerId => {
//     console.info('아이디 ::: ', customerId);
//     const response =  await axios.get(`${serverPROTOCOL}${serverURL}/autobid/powerlink?CUSTOMER_ID/${customerId}`);
//
//     return response.data;
// }

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const PowerLinkKeywordContainer = () => {
    const [state, dispatch] = useReducer(reducer, {
       loading: true,
       data: null,
       error: false
    });
    const [customer, setCustomer] = useState({});
    const [customerList, setCustomerList] = useState([]);

    const { loading, data, error } = state;

    const selectCustomer = e => setCustomer(e.target.value);

    const fetchPowerLinkData = async customerId => {
        dispatch({ type: 'LOADING' });
        try {
            const powerLinkResponse = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/powerlink?CUSTOMER_ID/${customerId}`);
            const customerResponse = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/id`);
            dispatch({ type: 'SUCCESS', data: powerLinkResponse.data });
            setCustomerList(customerResponse.data);
        } catch(e) {
            dispatch({ type: 'ERROR' });
        }
    }

    const handleAutoBidActive = async () => {                                                   // 901474&activate=true
        let testData = [{"nccKeywordId": "nkw-a001-01-000003468178392__라이브커머스쇼호스트"}];

        try {
            const test = await SendRequest().put(`http://218.52.115.188:8000/autobid/powerlink/activate?CUSTOMER_ID=${customer["CUSTOMER_ID"]}&activate=${true}`, testData);

            console.info('김주년챠챠 !!!', test);
        } catch(e) {

        }
    }

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem("customer")));
    }, []);

    useEffect(() => {
        if (!!customer["CUSTOMER_ID"]) fetchPowerLinkData(customer["CUSTOMER_ID"]);
    }, [customer]);


    return (
        <PowerLinkKeywordPresenter
            loading={loading}
            error={error}
            data={data && data}
            customerList={customerList}
            selectCustomer={selectCustomer}
            handleAutoBidActive={handleAutoBidActive}
        />
    )
}

export default PowerLinkKeywordContainer;

