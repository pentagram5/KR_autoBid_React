import React, {useCallback, useContext, useEffect, useState} from 'react';
import AddAutoBidPresenter from "../../components/addAutoBid/AddAutoBidPresenter";
import {AuthContext} from "../../utils/AuthContext";
import SendRequest from "../../utils/SendRequest";
import * as constants from "../../utils/constants";
import {toast} from "react-toastify";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

const PowerContentsAutoBidContainer = () => {
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
    const [simpleSchedule, setSimpleSchedule] = useState({
        week: 'all',
        time: '0~23',
    });
    const [keywordInfo, setKeywordInfo] = useState([]);
    const [keywordOption, setKeywordOption] = useState({
        keyword_info: [],
        device: "PC",
        bid_cycle: 5,
        target_Rank: 0,
        max_bid: 0,
        min_bid: 0,
        bid_adj_amount: 0,
        setting: {
            mon: '0~23',
            tue: '0~23',
            wed: '0~23',
            thu: '0~23',
            fri: '0~23',
            sat: '0~23',
            sun: '0~23',
        }
    });

    // 간편 설정 요일, 시간 설정
    const handleSimpleScheduleSetting = useCallback((e, type) => {
        const {value} = e.target;
        setSimpleSchedule({
            ...simpleSchedule,
            [type]: value,
        });
    }, [simpleSchedule]);

    // 설정 구분, 입찰 조정 금액 Radio 상태
    const handleRadioTab = useCallback((e, type) => {
        setRadioState({
            ...radioState,
            [type]: parseInt(e.target.value)
        });
    }, [radioState]);

    // 입찰 전략 설정
    const onAutoBidChange = useCallback((e, type) => {
        let {name, value} = e.target;

        switch (type) {
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
    }, [keywordOption]);

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
        else if (checkedIndex === checked.length - 1) newChecked = newChecked.concat(checked.slice(0, -1));
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
    const onAddSettingBox = useCallback(() => {
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
    }, [checked, keywordList, settingList]);

    // SettingList keyword 삭제
    const onDeleteKeyword = useCallback(nccKeywordId => {
        setSettingList(settingList.filter(list => list.nccKeywordId !== nccKeywordId));
    }, [settingList]);

    // 입찰 키워드 select 선택
    const handleKeywordSelected = useCallback(async (e, type) => {
        const {target: {value}} = e;
        if (value === "") return;
        try {
            const {data} = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/powercontents/${type === "nccCampaignId" ? "adgroup" : "keywords"}?CUSTOMER_ID=${customer["CUSTOMER_ID"]}&${type}=${value}`);

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
            const {data} = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/powercontents/campaign?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`);
            setCampaignList(data.campaign_list);
        }
    }, [customer]);


    // 체크된 키워드 아이디 parse 후 객체 담기
    useEffect(() => {
        if (checked.length > 0) {
            setKeywordInfo(
                checked.reduce((target, key, index) => {
                    target[index] = {
                        "nccCampaignId": keywordId.nccCampaignId,
                        "nccAdgroupId": keywordId.nccAdgroupId,
                        "nccKeywordId": key
                    }
                    return target;
                }, ["초기값 있니 ?"])
            );
        }
        console.info(':::::::', keywordInfo)
        // setKeywordOption({
        //     ...keywordOption,
        //     keyword_info: [...keywordOption.keyword_info, keywordInfo]
        // });
        // .reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);
    }, [checked]);

    useEffect(() => {
        console.info('keywordOption : ', keywordOption.keyword_info);
        console.info('keywordInfo : ', keywordInfo);
    }, [keywordOption, keywordInfo]);








    // 간편 설정 요일 및 시간 data 변환
    useEffect(() => {
        const {week, time} = simpleSchedule;
        if (week === 'all') {
            setKeywordOption({
                ...keywordOption,
                setting: {
                    mon: time,
                    tue: time,
                    wed: time,
                    thu: time,
                    fri: time,
                    sat: time,
                    sun: time,
                }
            });
        } else if (week === 'weekDays') {
            setKeywordOption({
                ...keywordOption,
                setting: {
                    mon: time,
                    tue: time,
                    wed: time,
                    thu: time,
                    fri: time,
                    sat: '0',
                    sun: '0',
                }
            });
        } else if (week === 'weekend') {
            setKeywordOption({
                ...keywordOption,
                setting: {
                    mon: '0',
                    tue: '0',
                    wed: '0',
                    thu: '0',
                    fri: '0',
                    sat: time,
                    sun: time,
                }
            });
        }
    }, [simpleSchedule]);

    useEffect(() => {
        fetchCampaignData();
    }, [fetchCampaignData]);

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem("customer")));
    }, []);

    const [selections, setSelections] = useState({
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: [],
    });

    // 나중에 보낼때
    let mondaySelectionFlag2 = 0;
    selections.mon.forEach((x, i) => {
        mondaySelectionFlag2 += Math.pow(2, x);
    });
    // console.info("monday2 ", mondaySelectionFlag2);


    // 입찰 관리 스케줄 고급 설정
    const [highSchedule, setHighSchedule] = useState({
        week: '',
        start: '',
        finish: '',
    });
    // 스케줄 칩 상태
    const [scheduleChips, setScheduleChips] = useState([]);

    // 요일, 시간 select box onChange
    const handleHighScheduleSetting = e => {
        const {name, value} = e.target;

        setHighSchedule({
            ...highSchedule,
            [name]: value
        });
    }

    const onAddChips = () => {
        const {week, start, finish} = highSchedule;
        let weekKor = '';

        if (week === '' || start === '' || finish === '') {
            alert('요일 및 시간을 설정해주세요.');
            return;
        }

        switch (week) {
            case 'mon':
                weekKor = '월';
                break;
            case 'tue':
                weekKor = '화';
                break;
            case 'web':
                weekKor = '수';
                break;
            case 'thu':
                weekKor = '목';
                break;
            case 'fri':
                weekKor = '금';
                break;
            case 'sat':
                weekKor = '토';
                break;
            case 'sun':
                weekKor = '일';
                break;
            default:
                weekKor = '';
        }

        let chip = `${weekKor} ${start}시~${finish}시`;

        let selectedValue = selections[week].find(time => {
            // 시작 23시 종료 00시 error 수정하기
            if (time >= parseInt(start) && time <= parseInt(finish)) {
                console.info('time', time);

                return time;
            } else {
                return false;
            }
        });

        if (selectedValue) {
            alert(`[${weekKor}요일] ${selectedValue}시는 이미 선택하셨습니다.`);
            return;
        }
        let tmp = [...selections[week]];
        for (let i = parseInt(start); i <= parseInt(finish); i++) {
            console.info('for 문 내부 ::: ', i);
            tmp.push(i);
        }

        setSelections({...selections, [week]: tmp});
        setScheduleChips([...scheduleChips, chip]);
    }

    const onDeleteChips = (item) => {
        setScheduleChips(scheduleChips.filter(chip => chip !== item));
    }

    // useEffect(() => {
    //     console.info('고급설정 : ', highSchedule);
    //     console.info('selections : ', selections);
    // }, [highSchedule, selections]);
    //
    // useEffect(() => {
    //     console.info('scheduleChips : ', scheduleChips);
    // }, [scheduleChips]);

    const onCancel = () => {

    }

    const onAddAutoBid = async () => {
        if (!keywordOption.target_Rank) {
            alert('희망 순위를 설정해주세요.');
            return;
        }

        console.info('keywordOption : ', keywordOption);
        console.info('keywordId : ', keywordId);
        try {
            const { data } = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/powercontents?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, keywordOption);

            if (data.status === 200) {
                toast.info('입찰 등록이 완료되었습니다.');
            } else {
                toast.error('에러발생');
            }

        } catch(e) {
            throw new Error(e);
        }
    }
    return (
        <AddAutoBidPresenter
            title="파워컨텐츠 자동입찰등록"
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
            simpleSchedule={simpleSchedule}
            handleSimpleScheduleSetting={handleSimpleScheduleSetting}
            handleHighScheduleSetting={handleHighScheduleSetting}
            scheduleChips={scheduleChips}
            onAddChips={onAddChips}
            onDeleteChips={onDeleteChips}
            selections={selections}
            onCancel={onCancel}
            onAddAutoBid={onAddAutoBid}
        />
    )
}

export default PowerContentsAutoBidContainer;