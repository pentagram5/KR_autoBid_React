import React, {useState, useContext, useEffect, useCallback} from 'react';
import AddAutoBidPresenter from "../../components/addAutoBid/AddAutoBidPresenter";
import {AuthContext} from "../../utils/AuthContext";
import SendRequest from "../../utils/SendRequest";
import * as constants from "../../utils/constants";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

const PowerLinkAutoBidContainer = () => {
    const {customerList} = useContext(AuthContext);
    const [customer, setCustomer] = useState({});
    const [checked, setChecked] = useState([]);
    const [campaignList, setCampaignList] = useState([]);
    const [adGroupList, setAdGroupList] = useState([]);
    const [keywordList, setKeywordList] = useState([]);
    const [settingList, setSettingList] = useState([]);
    const [keywordId, setKeywordId] = useState({
        nccCampaignId: "캠페인명 설정",
        nccAdgroupId: "광고그룹명 설정",
        nccKeywordId: "",
    });
    const [radioState, setRadioState] = useState({
        simpleHigh: 0,
        bid_adj_amount: 0
    });
    const [keywordOption, setKeywordOption] = useState({
            device: "PC",
            bid_cycle: 5,
            target_Rank: 5,
            max_bid: 0,
            min_bid: 0,
            bid_adj_amount: 0,
            setting: {
                mon: '0',
                tue: '0',
                wed: '0',
                thu: '0',
                fri: '0',
                sat: '0',
                sun: '0',
            }
    });

    const handleRadioTab = (e, type) => {
        setRadioState({
            ...radioState,
            [type]: parseInt(e.target.value)
        });
    }


    // 입찰 전략 설정
    const onAutoBidChange = (e, type) => {
        let { name, value } = e.target;

        switch(type) {
            case 'device':
                setKeywordOption({
                    ...keywordOption,
                    [name]: value
                });
                break;
            case 'max_bid':
            case 'min_bid':
            case 'target_Rank':
            case 'bid_cycle':
            case 'bid_adj_amount':
                value = parseInt(value);
                if (isNaN(value)) value = 0;
                setKeywordOption({
                    ...keywordOption,
                    [name]: value
                });
                break;
            default:
                return;
        }
    }

    // 체크박스의 배열 중 체크된 리스트 확인
    const isChecked = useCallback(id => checked.indexOf(id) !== -1, [checked]);

    // 체크박스 전체 선택
    const handleAllChecked = useCallback(e => {
        if (e.target.checked) {
            const newChecked = keywordList.map(list => list.nccKeywordId);
            setChecked(newChecked);
            return;
        }
        setChecked([]);
    }, [keywordList]);

    // 체크박스 선택
    const handleChecked = useCallback((e, id) => {
        const checkedIndex = checked.indexOf(id);
        let newChecked = [];

        if (checkedIndex === -1) newChecked = newChecked.concat(checked, id);
        else if (checkedIndex === 0) newChecked = newChecked.concat(checked.slice(1));
        else if (checkedIndex === checked.length -1) newChecked = newChecked.concat(checked.slice(0, -1));
        else if (checkedIndex === 0) newChecked = newChecked.concat(checked.slice(0, checkedIndex), checked.slice(checkedIndex + 1));

        setChecked(newChecked);
    }, [checked]);

    // 광고주 select 선택
    const handleCustomerChange = useCallback(e => {
        const list = customerList.find(list => list.CUSTOMER_ID === e.target.value);
        setCustomer(list);
        localStorage.setItem("customer", JSON.stringify(list));
    }, [customerList]);

    // 체크된 keyword SettingList 박스에 추가
    const onAddSettingBox = () => {
        let newSettingList = [...settingList];

        keywordList.forEach((list, index) => {
            checked.forEach(check => {
                if (list.nccKeywordId === check) {
                    newSettingList.push(list);
                }
            })
        });

        newSettingList = newSettingList.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);

        setSettingList(newSettingList);
        setChecked([]);
    }

    // SettingList keyword 삭제
    const onDeleteKeyword = nccKeywordId => {
        setSettingList(settingList.filter(list => list.nccKeywordId !== nccKeywordId));
    }

    // 입찰 키워드 select 선택
    const handleKeywordSelected = useCallback(async (e, type) => {
        const {target: {value}} = e;
        if (value === "") return;
        try {
            const {data} = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/powerlink/${type === "nccCampaignId" ? "adgroup" : "keywords"}?CUSTOMER_ID=${customer["CUSTOMER_ID"]}&${type}=${value}`);

            setKeywordId({
                ...keywordId,
                [type]: value,
            });

            if (type === "nccCampaignId") setAdGroupList(data.adgroup_list);
            else setKeywordList(data.keywords_list);
        } catch (e) {
            throw new Error(e);
        }
    }, [customer, keywordId]);

    const fetchCampaignData = useCallback(async () => {
        if (!!customer["CUSTOMER_ID"]) {
            const {data} = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/powerlink/campaign?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`);
            setCampaignList(data.campaign_list);
        }
    }, [customer]);

    // useEffect(() => console.info('수정 리스트 ::: ', settingList), [settingList]);
    // useEffect(() => console.info('keywordOption ::: ', keywordOption), [keywordOption]);

    useEffect(() => {
        fetchCampaignData();
    }, [fetchCampaignData]);

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem("customer")));
    }, []);

    // 체크된 키워드 아이디 parse 후 객체 담기
    // useEffect(() => {
    //     if (checked.length > 0) {
    //         setKeywordOption({
    //             ...keywordOption,
    //             keyword_info: checked.reduce((target, key, index) => {
    //                 target[index] = {
    //                     "nccCampaignId": keywordId.nccCampaignId,
    //                     "nccAdgroupId": keywordId.nccAdgroupId,
    //                     "nccKeywordId": key
    //                 }
    //                 return target;
    //             }, [])
    //         });
    //     }
    // }, [checked]);

    return (
        <AddAutoBidPresenter
            title="파워링크 자동입찰등록"
            handleCustomerChange={handleCustomerChange}
            handleKeywordSelected={handleKeywordSelected}
            customerList={customerList}
            customer={customer}
            campaignList={campaignList}
            adGroupList={adGroupList}
            keywordList={keywordList}
            checked={checked}
            isChecked={isChecked}
            handleAllChecked={handleAllChecked}
            handleChecked={handleChecked}
            settingList={settingList}
            onAddSettingBox={onAddSettingBox}
            onDeleteKeyword={onDeleteKeyword}
            keywordOption={keywordOption}
            radioState={radioState}
            handleRadioTab={handleRadioTab}
            onAutoBidChange={onAutoBidChange}
        />
    )
}

export default PowerLinkAutoBidContainer;