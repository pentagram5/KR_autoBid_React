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
    const [keywordState, setKeywordState] = useState({
        keyword_info: [],
        keyword_option: {
            device: "PC",
            bid_cycle: 5,
            target_Rank: 5,
            bid_period: "",
            bid_times: "",
            max_bid: 0,
            min_bid: 0,
            bid_adj_amount: 0
        }
    });

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

    // keyword 선택 후 SettingList 박스에 추가
    const onAddSettingBox = () => {
        let keywordArray = [];
        // keywordList.find((list, index) => list.nccKeywordId === checked[index] && keywordArray.push(list));



        keywordList.find((list, index) => {

            // console.info('list.nccKeywordId ::: ', list.nccKeywordId);
            // console.info('index ::: ', index);
            console.info('같냐 ? ::: ', list.nccKeywordId === checked[index]);


            if (list.nccKeywordId === checked[index]) {
                console.info('리스트 ::: ', list);
                keywordArray.push(list);
            }
        });

        console.info('keywordArray ::: ', keywordArray);
        console.info('길이 ::: ', keywordList.length);


        setSettingList(keywordArray);
        setChecked([]);
    }

    // SettingList 박스에서 keyword 제거
    const onDeleteKeyword = nccKeywordId => {

    }

    useEffect(() => {
        console.info('settingList ::: ', settingList);
    }, [settingList]);

    // useEffect(() => {
    //     console.info('keywordState.keyword_info', keywordState.keyword_info);
    // }, [keywordState.keyword_info]);

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


    useEffect(() => {
        fetchCampaignData();
    }, [fetchCampaignData]);

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem("customer")));
    }, []);

    // 체크된 키워드 아이디 parse 후 객체 담기
    useEffect(() => {
        if (checked.length > 0) {
            setKeywordState({
                ...keywordState,
                keyword_info: checked.reduce((target, key, index) => {
                    target[index] = {
                        "nccCampaignId": keywordId.nccCampaignId,
                        "nccAdgroupId": keywordId.nccAdgroupId,
                        "nccKeywordId": key
                    }
                    return target;
                }, [])
            });
        }
    }, [checked]);

    return (
        <AddAutoBidPresenter
            title="파워링크 자동입찰등록"
            keywordId={keywordId}
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
            onAddSettingBox={onAddSettingBox}
            settingList={settingList}
        />
    )
}

export default PowerLinkAutoBidContainer;