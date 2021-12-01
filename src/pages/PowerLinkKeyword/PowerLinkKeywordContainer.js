import React, {useEffect, useState} from 'react';
import PowerLinkKeywordPresenter from "./PowerLinkKeywordPresenter";
import axios from "axios";
import useAsync from "../../utils/useAsync";
import * as constants from "../../utils/constants";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

const fetchPowerLinkData = async customerId => {
    console.info('아이디 ::: ', customerId);
    const response =  await axios.get(`${serverPROTOCOL}${serverURL}/autobid/powerlink?CUSTOMER_ID/${customerId}`);

    return response.data;
}

const PowerLinkKeywordContainer = () => {
    const [customer, setCustomer] = useState([]);
    const [state, refetch] = useAsync(fetchPowerLinkData, []);

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem("customer")));
    }, []);

    useEffect(() => {
        if (!!customer && customer[0] && customer[0].CUSTOMER_ID) fetchPowerLinkData(customer[0].CUSTOMER_ID);
    }, [customer]);


    return (
        <PowerLinkKeywordPresenter
            customer={customer}
            state={state}
        />
    )
}

export default PowerLinkKeywordContainer;