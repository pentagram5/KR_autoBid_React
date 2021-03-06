import React, {useEffect, useState, useReducer, useCallback, useRef} from 'react';
import KeywordPresenter from "../../components/keyword/KeywordPresenter";
import {toast} from "react-toastify";
import SendRequest from "../../utils/SendRequest";
import * as constants from "../../utils/constants";
import {useNavigate} from "react-router-dom";
import {tokenValidate} from "../../utils/tokenValidate";

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

const PowerContentsKeywordContainer = () => {
    const navigator = useNavigate();
    const filterRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, {
        loading: true,
        data: null,
        error: false
    });
    const {loading, data, error} = state;
    const [customer, setCustomer] = useState({});

    const [customerName, setCustomerName] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [customerList, setCustomerList] = useState([]);
    const [checked, setChecked] = useState([]);
    const [nccKeywordId, setNccKeywordId] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [cycleChangeOpen, setCycleChangeOpen] = useState(false);
    const [autoBidCycle, setAutoBidCycle] = useState(5);
    const [searchFilterOpen, setSearchFilterOpen] = useState(false);
    const [searchFilter, setSearchFilter] = useState({
        campaignName: "",
        adgroupName: "",
        keyword: "",
        device: "",
        activate: "",
        targetRank: "",
        maxBid: "",
        bidCycle: "",
        opt: 0
    });

    // ?????? ?????? input ???
    const onFilterChange = e => {
        let { name, value } = e.target;
        if (name === "maxBid") value = value.replace(/[^-0-9]/g,'');
        if (name === "opt") value = parseInt(value);
        setSearchFilter({
            ...searchFilter,
            [name]: value
        });
    }

    // ?????????
    const onFilterReset = () => {
        setSearchFilter({
            campaignName: "",
            adgroupName: "",
            keyword: "",
            device: "",
            activate: "",
            targetRank: "",
            maxBid: "",
            bidCycle: "",
            opt: 0
        });
    }

    // ???????????? ??????
    const onSearchFilter = async () => {
        tokenValidate();
        const { campaignName, adgroupName, keyword, device, activate, targetRank, maxBid, bidCycle, opt } = searchFilter;

        try {
            const res = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/powercontents/filter?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, {
                Campaign_name: campaignName,
                Adgroup_name: adgroupName,
                Keyword: keyword,
                device: device,
                activate: activate,
                target_Rank: targetRank,
                max_bid: maxBid,
                bid_cycle: bidCycle,
                opt: opt
            });


            dispatch({ type: "RE_REQUEST", data: res.data.keywords });
            onFilterReset();
            setSearchFilterOpen(false);
        } catch(e) {
            throw new Error(e);
        }
    }

    // ???????????? ??? open / close
    const handleFilterOpen = () => setSearchFilterOpen(true);
    const handleFilterClose = e => {
        if ((searchFilterOpen && (!filterRef.current || !filterRef.current.contains(e.target))) || (e.target.name === "close")) setSearchFilterOpen(false);

    }

    // ?????? ?????? ?????? ?????? open
    const handleModalOpen = () => {
        if (checked.length === 0) {
            toast.error('???????????? ???????????? ??????????????????.');
            return;
        }
        setCycleChangeOpen(true);
    }
    // ?????? ?????? ?????? ?????? close
    const handleModalClose = () => setCycleChangeOpen(false);

    // ?????????
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
        setChecked([]);
    }

    // ????????? row
    const handleChangeRowsPerPage = e => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    // ????????? ?????? ??????
    const handleConfirmClose = useCallback(() => setConfirmOpen(false), []);

    // confirm ?????? ??????
    const onConfirmChange = useCallback(() => {
        const list = customerList.find(list => list.CUSTOMER_ID === customerId);

        setCustomer(list);
        localStorage.setItem("customer", JSON.stringify(list));

        setConfirmOpen(false);
        setChecked([]);
        setPage(0);
    }, [customerId, customer]);

    const onConfirmCancel = useCallback(() => {
        setConfirmOpen(false);
    }, []);

    // ????????? select ??????
    const handleCustomerChange = useCallback(e => {
        const data = e.target.value.split('__');
        setConfirmOpen(true);
        setCustomerId(data[0]);
        setCustomerName(data[1]);
    }, [customerList, customerId, customerName]);

    // ???????????? ?????? ??????
    const handleAllChecked = e => {
        if (e.target.checked) {
            const newChecked = data.keywords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(list => list.nccKeywordId);
            setChecked(newChecked);
            return;
        }
        setChecked([]);
    }

    // ???????????? ??????
    const handleChecked = (e, id) => {
        const checkedIndex = checked.indexOf(id);
        let newChecked = [];

        if (checkedIndex === -1) newChecked = newChecked.concat(checked, id)
        else if (checkedIndex === 0) newChecked = newChecked.concat(checked.slice(1));
        else if (checkedIndex === checked.length - 1) newChecked = newChecked.concat(checked.slice(0, -1));
        else if (checkedIndex > 0) newChecked = newChecked.concat(checked.slice(0, checkedIndex), checked.slice(checkedIndex + 1));

        setChecked(newChecked);
    }

    // ???????????? ????????? / ????????????
    const handleAutoBidActive = async (type) => {
        tokenValidate();
        if (checked.length === 0) {
            toast.error(`${type === "active" ? "?????????" : "????????????"} ??? ???????????? ??????????????????.`);
            return;
        }
        try {
            const {data} = await SendRequest().put(`${serverPROTOCOL}${serverURL}/autobid/powercontents/activate?CUSTOMER_ID=${customer["CUSTOMER_ID"]}&activate=${(type === "active")}`, nccKeywordId);
            dispatch({type: 'RE_REQUEST', data: data.keywords});

            if (data.done) {
                toast.info(`???????????? ???????????? ${type === "active" ? "?????????" : "????????????"} ???????????????.`);
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    // ???????????? ?????? - ?????? ???????????? ??????
    const handleUpdateAutoBid = () => {
        navigator('/powerContentsUpdate');
        localStorage.setItem("checked", checked);
    }

    // ???????????? ??????
    const handleDeleteAutoBid = async () => {
        tokenValidate();
        if (checked.length === 0) {
            toast.error('????????? ???????????? ??????????????????.');
            return;
        }
        if (window.confirm("?????? ?????????????????????????")) {
            try {
                const res = await SendRequest().delete(`${serverPROTOCOL}${serverURL}/autobid/powercontents/delete?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, {data: nccKeywordId});
                if (res.status === 200) {
                    dispatch({type: 'SUCCESS', data: res.data});
                    setChecked([]);
                    toast.info('????????? ???????????? ?????????????????????.');
                }
            } catch (e) {
                throw new Error(e);
            }
        }
    }

    const onAutoBidCycleChange = useCallback(e => setAutoBidCycle(e.target.value), []);

    // ?????? ?????? ??????
    const handleChangeAutoBidCycle = async () => {
        tokenValidate();
        try {
            const { data } = await SendRequest().put(`${serverPROTOCOL}${serverURL}/autobid/powercontents/cycle?CUSTOMER_ID=${customer["CUSTOMER_ID"]}&cycle=${autoBidCycle}`, nccKeywordId);

            if (!!data) {
                toast.info('????????? ???????????? ????????? ?????????????????????.');
                dispatch({ type: 'SUCCESS', data: data });
                setCycleChangeOpen(false);
                setAutoBidCycle(5);
                setChecked([]);
            }
        } catch(e) {
            throw new Error(e);
        }
    }

    // ????????????
    const handleDownload = async () => {
        tokenValidate();
        try {
            const res = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/powercontents/download?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([res.data], {
                type: res.headers['content-type'],
                encoding: 'UTF-8'
            }));

            const fileName = res.headers["content-disposition"].split("=")[1];

            let link = document.createElement('a');

            link.href = url;
            link.download = fileName;
            link.target = '_blank';
            link.click();
            window.URL.revokeObjectURL(link);
            link.remove();
        } catch (e) {
            throw new Error(e);
        }
    }

    // ???????????? ?????? checked
    const isChecked = id => checked.indexOf(id) !== -1;

    // data fetching
    const fetchPowerLinkData = async customerId => {
        tokenValidate();
        dispatch({type: 'LOADING'});

        try {
            const powerLinkResponse = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/powercontents?CUSTOMER_ID=${customerId}`);
            const customerResponse = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/id`);

            dispatch({type: 'SUCCESS', data: powerLinkResponse.data});
            setCustomerList(customerResponse.data.id_info);

        } catch (e) {
            dispatch({type: 'ERROR'});
        }
    }

    // ??????
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('campaign');

    const handleRequestSort = (e, property) => {
        const isAsc = (orderBy === property) && order === 'asc';

        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

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
        if (!!customer["CUSTOMER_ID"]) fetchPowerLinkData(customer["CUSTOMER_ID"]);
    }, [customer]);

    useEffect(() => {
        window.addEventListener('click', handleFilterClose);
        return () => window.removeEventListener('click', handleFilterClose);
    }, [searchFilterOpen]);



    return (
        <KeywordPresenter
            title="??????????????? ??????????????????"
            loading={loading}
            error={error}
            data={data && data}
            customer={customer}
            customerList={customerList}
            handleCustomerChange={handleCustomerChange}
            handleAutoBidActive={handleAutoBidActive}
            handleUpdateAutoBid={handleUpdateAutoBid}
            handleDeleteAutoBid={handleDeleteAutoBid}
            checked={checked}
            isChecked={isChecked}
            handleChecked={handleChecked}
            handleAllChecked={handleAllChecked}
            handleDownload={handleDownload}

            orderBy={orderBy}
            order={order}
            handleRequestSort={handleRequestSort}
            getComparator={getComparator}

            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}

            cycleChangeOpen={cycleChangeOpen}
            handleModalOpen={handleModalOpen}
            handleModalClose={handleModalClose}

            autoBidCycle={autoBidCycle}
            onAutoBidCycleChange={onAutoBidCycleChange}
            handleChangeAutoBidCycle={handleChangeAutoBidCycle}
            nccKeywordId={nccKeywordId}

            filterRef={filterRef}
            searchFilterOpen={searchFilterOpen}
            handleFilterOpen={handleFilterOpen}
            handleFilterClose={handleFilterClose}
            searchFilter={searchFilter}
            onFilterChange={onFilterChange}
            onFilterReset={onFilterReset}
            onSearchFilter={onSearchFilter}

            confirmOpen={confirmOpen}
            handleConfirmClose={handleConfirmClose}
            customerName={customerName}
            onConfirmChange={onConfirmChange}
            onConfirmCancel={onConfirmCancel}
        />
    )
}

export default React.memo(PowerContentsKeywordContainer);



