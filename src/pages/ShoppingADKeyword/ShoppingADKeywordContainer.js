import React, {useEffect, useState, useReducer} from 'react';
import KeywordPresenter from "../../components/keyword/KeywordPresenter";
import * as constants from "../../utils/constants";
import {toast} from "react-toastify";
import SendRequest from "../../utils/SendRequest";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: false
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: false
            };
        case 'RE_REQUEST':
            return {
                loading: false,
                data: {
                    ...state.data,
                    "keywords": action.data
                },
                error: false
            }
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

const ShoppingADKeywordContainer = () => {
    const [state, dispatch] = useReducer(reducer, {
        loading: true,
        data: null,
        error: false
    });
    const { loading, data, error } = state;
    const [customer, setCustomer] = useState({});
    const [customerList, setCustomerList] = useState([]);
    const [checked, setChecked] = useState([]);
    const [nccKeywordId, setNccKeywordId] = useState([]);

    const handleChangeCustomer = e => customerList.find(list => list.CUSTOMER_ID === e.target.value && setCustomer(list));

    const handleAllChecked = e => {
        if (e.target.checked) {
            const newChecked = data.keywords.map(list => list.nccKeywordId);
            setChecked(newChecked);
            return;
        }
        setChecked([]);
    }

    const handleChecked = (e, id) => {
        const checkedIndex = checked.indexOf(id);
        let newChecked = [];

        if (checkedIndex === -1) newChecked = newChecked.concat(checked, id)
        else if (checkedIndex === 0) newChecked = newChecked.concat(checked.slice(1));
        else if (checkedIndex === checked.length -1) newChecked = newChecked.concat(checked.slice(0, -1));
        else if (checkedIndex > 0) newChecked = newChecked.concat(checked.slice(0, checkedIndex), checked.slice(checkedIndex + 1));

        setChecked(newChecked);
    }

    const handleAutoBidActive = async (type) => {
        if (checked.length === 0 ) {
            toast.error(`${type === "active" ? "활성화" : "비활성화"} 할 키워드를 선택해주세요.`);
            return;
        }
        try {
            const { data } = await SendRequest().put(`${serverPROTOCOL}${serverURL}/autobid/shopping_ad/activate?CUSTOMER_ID=${customer["CUSTOMER_ID"]}&activate=${(type === "active")}`, nccKeywordId);
            dispatch({ type: 'RE_REQUEST', data: data.keywords });

            if (data.done) {
                toast.info(`선택하신 키워드가 ${type === "active" ? "활성화" : "비활성화"} 되었습니다.`);
            }
        } catch(e) {
            throw new Error(e);
        }
    }

    const handleDeleteAutoBid = async () => {
        if (checked.length === 0 ) {
            toast.error('삭제할 키워드를 선택해주세요.');
            return;
        }
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                const res = await SendRequest().delete(`${serverPROTOCOL}${serverURL}/autobid/shopping_ad/delete?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, {data: nccKeywordId});
                console.info('res', res);
                if (res.status === 200) {
                    dispatch({ type: 'SUCCESS', data: res.data });
                    toast.info('선택한 키워드를 삭제하였습니다.');
                }
            } catch(e) {
                throw new Error(e);
            }
        }
    }

    const handleDownload = async () => {
        const config = {
            responseType: "blob",
        }
        try {
            const res = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/shopping_ad/download?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, config);
            const url = window.URL.createObjectURL(new Blob([res.data]));

            console.info('res', res);
            console.info('url', url);

        } catch(e) {
            throw new Error(e);
        }
    }

    const isChecked = id => checked.indexOf(id) !== -1;

    const fetchShoppingADData = async customerId => {
        dispatch({ type: 'LOADING' });

        try {
            const shopping_adResponse = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/shopping_ad?CUSTOMER_ID=${customerId}`);
            const customerResponse = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/id`);

            dispatch({ type: 'SUCCESS', data: shopping_adResponse.data });
            setCustomerList(customerResponse.data.id_info);

        } catch(e) {
            dispatch({ type: 'ERROR' });
        }
    }

    useEffect(() => {
        console.info('nccKeywordId :: ', nccKeywordId)
    }, [nccKeywordId]);

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem("customer")));
    }, []);

    useEffect(() => {
        if (checked.length > 0) {
            setNccKeywordId(checked.reduce((target, key, index) => {
                target[index] = {"nccKeywordId": key};
                return target;
            }, []));
        }
    }, [checked]);

    useEffect(() => {
        if (!!customer["CUSTOMER_ID"]) fetchShoppingADData(customer["CUSTOMER_ID"]);
    }, [customer]);


    return (
        <KeywordPresenter
            title="쇼핑광고 자동입찰관리"
            loading={loading}
            error={error}
            data={data && data}
            customer={customer}
            customerList={customerList}
            handleChangeCustomer={handleChangeCustomer}
            handleAutoBidActive={handleAutoBidActive}
            handleDeleteAutoBid={handleDeleteAutoBid}
            checked={checked}
            isChecked={isChecked}
            handleChecked={handleChecked}
            handleAllChecked={handleAllChecked}
            handleDownload={handleDownload}
        />
    )
}

export default ShoppingADKeywordContainer;

