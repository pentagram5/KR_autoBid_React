import React, {useEffect, useState, useReducer, useCallback, useRef} from 'react';
import KeywordPresenter from "../../components/keyword/KeywordPresenter";
import {toast} from "react-toastify";
import SendRequest from "../../utils/SendRequest";
import * as constants from "../../utils/constants";

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
    const filterRef = useRef(null);
    const [state, dispatch] = useReducer(reducer, {
        loading: true,
        data: null,
        error: false
    });
    const {loading, data, error} = state;
    const [customer, setCustomer] = useState({});
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
        bidCycle: ""
    });

    // 조회 필터 input 값
    const onFilterChange = e => {
        let { name, value } = e.target;
        if (name === "maxBid") value = value.replace(/[^-0-9]/g,'');
        setSearchFilter({
            ...searchFilter,
            [name]: value
        });
    }

    // 초기화
    const onFilterReset = () => {
        setSearchFilter({
            campaignName: "",
            adgroupName: "",
            keyword: "",
            device: "",
            activate: "",
            targetRank: "",
            maxBid: "",
            bidCycle: ""
        });
    }

    // 조회필터 검색
    const onSearchFilter = async () => {
        const { campaignName, adgroupName, keyword, device, activate, targetRank, maxBid, bidCycle } = searchFilter;

        try {
            const res = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/powercontents/filter?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, {
                Campaign_name: campaignName,
                Adgroup_name: adgroupName,
                Keyword: keyword,
                device: device,
                activate: activate,
                target_Rank: targetRank,
                max_bid: maxBid,
                bid_cycle: bidCycle
            });

            console.info('?????/**/', res.data.keywords);

            dispatch({ type: "RE_REQUEST", data: res.data.keywords });
            onFilterReset();
            setSearchFilterOpen(false);
        } catch(e) {
            throw new Error(e);
        }
    }

    // 조회필터 창 open / close
    const handleFilterOpen = () => setSearchFilterOpen(true);
    const handleFilterClose = e => {
        if ((searchFilterOpen && (!filterRef.current || !filterRef.current.contains(e.target))) || (e.target.name === "close")) setSearchFilterOpen(false);

    }

    // 입찰 주기 변경 모달 open
    const handleModalOpen = () => {
        if (checked.length === 0) {
            toast.error('변경하실 키워드를 선택해주세요.');
            return;
        }
        setCycleChangeOpen(true);
    }
    // 입찰 주기 변경 모달 close
    const handleModalClose = () => setCycleChangeOpen(false);

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

    // 광고주 select 선택
    const handleCustomerChange = useCallback(e => {
        const list = customerList.find(list => list.CUSTOMER_ID === e.target.value);
        setCustomer(list);
        localStorage.setItem("customer", JSON.stringify(list));
    }, [customerList]);

    const handleAllChecked = e => {
        if (e.target.checked) {
            const newChecked = (rowsPerPage > 0 ? data.keywords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data.keywords).map(list => list.nccKeywordId);
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

    // 자동입찰 활성화 / 비활성화
    const handleAutoBidActive = async (type) => {
        if (checked.length === 0) {
            toast.error(`${type === "active" ? "활성화" : "비활성화"} 할 키워드를 선택해주세요.`);
            return;
        }
        try {
            const {data} = await SendRequest().put(`${serverPROTOCOL}${serverURL}/autobid/powercontents/activate?CUSTOMER_ID=${customer["CUSTOMER_ID"]}&activate=${(type === "active")}`, nccKeywordId);
            dispatch({type: 'RE_REQUEST', data: data.keywords});

            if (data.done) {
                toast.info(`선택하신 키워드가 ${type === "active" ? "활성화" : "비활성화"} 되었습니다.`);
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    // 자동입찰 삭제
    const handleDeleteAutoBid = async () => {
        if (checked.length === 0) {
            toast.error('삭제할 키워드를 선택해주세요.');
            return;
        }
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                const res = await SendRequest().delete(`${serverPROTOCOL}${serverURL}/autobid/powercontents/delete?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, {data: nccKeywordId});
                if (res.status === 200) {
                    dispatch({type: 'SUCCESS', data: res.data});
                    toast.info('선택한 키워드를 삭제하였습니다.');
                }
            } catch (e) {
                throw new Error(e);
            }
        }
    }

    const onAutoBidCycleChange = useCallback(e => setAutoBidCycle(e.target.value), []);

    // 입찰 주기 변경
    const handleChangeAutoBidCycle = async () => {
        try {
            const { data } = await SendRequest().put(`${serverPROTOCOL}${serverURL}/autobid/powercontents/cycle?CUSTOMER_ID=${customer["CUSTOMER_ID"]}&cycle=${autoBidCycle}`, nccKeywordId);

            if (!!data) {
                toast.info('선택한 키워드의 주기를 변경하였습니다.');
                dispatch({ type: 'SUCCESS', data: data });
                setCycleChangeOpen(false);
                setAutoBidCycle(5);
                setChecked([]);
            }
        } catch(e) {
            throw new Error(e);
        }
    }

    // 다운로드
    const handleDownload = async () => {
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

    // 체크박스 선택 checked
    const isChecked = id => checked.indexOf(id) !== -1;

    // data fetching
    const fetchPowerLinkData = async customerId => {
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

    // 정렬
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

    useEffect(() => {
        console.info('data', data);
    }, [data]);

    return (
        <KeywordPresenter
            title="파워컨텐츠 자동입찰관리"
            loading={loading}
            error={error}
            data={data && data}
            customer={customer}
            customerList={customerList}
            handleCustomerChange={handleCustomerChange}
            handleAutoBidActive={handleAutoBidActive}
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
        />
    )
}

export default PowerContentsKeywordContainer;



