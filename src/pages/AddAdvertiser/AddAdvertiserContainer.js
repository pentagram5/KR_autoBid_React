import React, {useCallback, useEffect, useState} from 'react';
import AddAdvertiserPresenter from "./AddAdvertiserPresenter";
import SendRequest from "../../utils/SendRequest";
import * as constants from "../../utils/constants";
import {toast} from "react-toastify";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

const AddAdvertiserContainer = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [customer, setCustomer] = useState({});
    const [customerList, setCustomerList] = useState([]);
    const [customerDataList, setCustomerDataList] = useState([]);
    const [checked, setChecked] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // 페이징
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
        setChecked([]);
    }

    // 페이지 row
    const handleChangeRowsPerPage = e => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    // 체크박스 선택 checked
    const isChecked = id => checked.indexOf(id) !== -1;

    // 체크박스 전체 선택
    const handleAllChecked = e => {
        if (e.target.checked) {
            const newChecked = (rowsPerPage > 0 ? customerDataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : customerDataList).map(list => list.CUSTOMER_ID);
            setChecked(newChecked);
            return;
        }
        setChecked([]);
    }

    // 체크박스 체크
    const handleChecked = (e, id) => {
        const checkedIndex = checked.indexOf(id);
        let newChecked = [];

        if (checkedIndex === -1) newChecked = newChecked.concat(checked, id)
        else if (checkedIndex === 0) newChecked = newChecked.concat(checked.slice(1));
        else if (checkedIndex === checked.length - 1) newChecked = newChecked.concat(checked.slice(0, -1));
        else if (checkedIndex > 0) newChecked = newChecked.concat(checked.slice(0, checkedIndex), checked.slice(checkedIndex + 1));

        setChecked(newChecked);
    }

    // 광고주 select 선택
    const handleCustomerChange = useCallback(e => {
        const list = customerList.find(list => list.CUSTOMER_ID === e.target.value);
        setCustomer(list);
        localStorage.setItem("customer", JSON.stringify(list));
    }, [customerList]);

    // 광고주 리스트 불러오기
    const fetchCustomer = async () => {
        try {
            const { data } = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/id`);
            setCustomerList(data.id_info);
        } catch (e) {
            throw new Error(e);
        }
    }

    // 광고주 정보 불러오기
    const fetchCustomerData = async () => {
        try {
            const { data } = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/id/register`);
            setCustomerDataList(data.id_info);
        } catch(e) {

        }
    }

    // 광고주 등록
    const handleAdvertiserRegister = async value => {
        try {
            const { data } = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/id/register`, {
                id_info: checked,
                Autobid_ac: value
            });

            console.info('data', data);
            if (data.done) {
                toast.info(`선택하신 광고주를 ${!!value ? "등록" : "미등록"} 하였습니다.`);
                setCustomerDataList(data.id_info);
            }
        } catch(e) {
            throw new Error(e);
        }
    }

    // 광고주 검색
    const handleSearchAdvertiser = async e => {
        const { target: { value }} = e;
        setSearchTerm(value);
        try {
            const { data } = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/id/register/search`, {
                word: value
            });

            if (data.done) {
                setCustomerDataList(data.id_info);
            }
        } catch(e) {
            throw new Error(e);
        }
    }



    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem("customer")));
    }, []);

    useEffect(() => {
        fetchCustomer();
        fetchCustomerData();
    }, [customer]);

    useEffect(() => {
        console.info('customerList', customerList)
    }, [customerList]);


    return (
        <AddAdvertiserPresenter
            title="광고주 등록"
            customer={customer}
            customerList={customerList}
            customerDataList={customerDataList}
            handleCustomerChange={handleCustomerChange}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            checked={checked}
            isChecked={isChecked}
            handleAllChecked={handleAllChecked}
            handleChecked={handleChecked}
            handleAdvertiserRegister={handleAdvertiserRegister}
            searchTerm={searchTerm}
            handleSearchAdvertiser={handleSearchAdvertiser}
        />
    )
}

export default AddAdvertiserContainer;