import React, {useCallback, useContext, useEffect, useState} from 'react';
import AddAutoBidPresenter from "../../components/addAutoBid/AddAutoBidPresenter";
import {AuthContext} from "../../utils/AuthContext";
import SendRequest from "../../utils/SendRequest";
import * as constants from "../../utils/constants";
import colors from "../../styles/colors";
import {korWeekChange} from "../../utils/common";
import {tokenValidate} from "../../utils/tokenValidate";
import {toast} from "react-toastify";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

const scheduleBgColor = [colors.pastelRed, colors.pastelYellow, colors.pastelGreen, colors.pastelBlue, colors.pastelPurple];


const ShoppingADAutoBidContainer = () => {
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState({});
    const [customerList, setCustomerList] = useState([]);
    const [campaignList, setCampaignList] = useState([]);
    const [adGroupList, setAdGroupList] = useState([]);
    const [adsList, setAdsList] = useState([]);
    const [selectedKeyword, setSelectedKeyword] = useState("");
    const [keywordList, setKeywordList] = useState([]);

    const [initialKeywordList, setInitialKeywordList] = useState([]);

    const [settingList, setSettingList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [keywordId, setKeywordId] = useState({
        nccCampaignId: "캠페인명 설정",
        nccAdgroupId: "광고그룹명 설정",
        nccKeywordId: "소재명 설정",
        schKeyword: "",
    });
    const [radioState, setRadioState] = useState({
        simpleHigh: 0,
        bid_adj_amount: 0,
        usedDate: 0
    });
    const [simpleSchedule, setSimpleSchedule] = useState({
        week: 'all',
        time: '0~23',
    });
    const [keywordOption, setKeywordOption] = useState({
        keyword_info: [],
        device: "PC",
        bid_cycle: 5,
        start_Date: "",
        end_Date: "",
        lowest_Bid_ac: 0,
        setting: {
            mon: '0~23',
            tue: '0~23',
            wed: '0~23',
            thu: '0~23',
            fri: '0~23',
            sat: '0~23',
            sun: '0~23',
            target_Rank: 0,
            max_bid: 0,
            min_bid: 0,
            bid_adj_amount: 0,
        }
    });
    const [highKeywordOption, setHighKeywordOption] = useState([]);
    // 입찰 관리 스케줄 고급 설정
    const [highSchedule, setHighSchedule] = useState({
        week: '',
        start: '',
        finish: '',
    });
    // 스케줄 칩 상태
    const [scheduleChips, setScheduleChips] = useState([]);

    // 광고주 select 선택
    const handleCustomerChange = useCallback(e => {
        const list = customerList.find(list => list.CUSTOMER_ID === e.target.value);
        setCustomer(list);
        localStorage.setItem("customer", JSON.stringify(list));
        setKeywordList([]);
        setAdGroupList([]);
        setSettingList([]);
    }, [customerList]);

    // 검색 onChange
    const handleSearchInput = e => setSearchInput(e.target.value);
    // 검색 reset
    const handleSearchClick = async () => {
        tokenValidate();
        try {
            const { data } = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/shopping_ad/keywords/search?CUSTOMER_ID=${customer["CUSTOMER_ID"]}&nccKeywordId=${keywordId.nccKeywordId}`, {
                word: searchInput
            });
            setKeywordList(data.keywords_list);
        } catch(e) {
            throw new Error(e);
        }
        setSearchInput("");
    }

    const handleSearchReset = () => {
        setSearchInput("");
        setKeywordList(initialKeywordList);
    }

    // 키워드 리스트 목록 선택 Radio 버튼
    const handleChange = e => setSelectedKeyword(e.target.value);
    const controlProps = (id) => {
        return ({
            checked: selectedKeyword === id,
            onChange: handleChange,
            value: id,
            name: 'keyword-radio',
            inputProps: {'aria-label': id},
        });
    }

    // 체크된 keyword SettingList 박스에 추가
    const onAddSettingBox = useCallback(() => {
        if (selectedKeyword === "") {
            alert('추가하실 항목을 선택해주세요.');
            return;
        } else if (settingList.length > 1) {
            alert('쇼핑광고 키워드 설정은 하나씩 설정이 가능합니다.');
            return;
        }

        let newKeywordId = {};
        let newKeywordInfo = [];
        newKeywordId = {...keywordId};
        newKeywordInfo.push(newKeywordId);

        keywordList.forEach(list => {
            let title = adsList.map(list => list.nccAdId === list.nccAdId && list.productTitle);

            if (list.id === selectedKeyword) {
                list.title = title[0];

                setSettingList([list]);
                for (let key in list) {
                    newKeywordId["schKeyword"] = list["schKeyword"]
                }
            }
        });

        setKeywordOption({
            ...keywordOption,
            keyword_info: newKeywordInfo
        });
    }, [selectedKeyword, settingList, keywordList, keywordOption, adsList, keywordId]);

    // SettingList keyword 삭제
    const onDeleteKeyword = useCallback(id => {
        setSettingList(settingList.filter(list => list.id !== id));
    }, [settingList]);

    // 입찰 키워드 select 선택
    const handleKeywordSelected = useCallback(async (e, type) => {
        tokenValidate();
        const {value} = e.target;
        let res;

        if (value === "") return;
        try {
            switch (type) {
                case "nccCampaignId":
                    res = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/shopping_ad/adgroup?CUSTOMER_ID=${customer["CUSTOMER_ID"]}&nccCampaignId=${value}`);
                    setAdGroupList(res.data.adgroup_list);
                    break;
                case "nccAdgroupId":
                    res = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/shopping_ad/ads?CUSTOMER_ID=${customer["CUSTOMER_ID"]}&nccAdgroupId=${value}`);
                    setAdsList(res.data.ads_list);
                    break;
                case "nccKeywordId":
                    res = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/shopping_ad/keywords?CUSTOMER_ID=${customer["CUSTOMER_ID"]}&nccAdid=${value}`);
                    setKeywordList(res.data.keywords_list);
                    setInitialKeywordList(res.data.keywords_list);
                    break;
                default:
                    return type;
            }

            setKeywordId({
                ...keywordId,
                [type]: value,
            });
        } catch (e) {
            throw new Error(e);
        }
    }, [customer, keywordId]);

    const fetchCampaignData = useCallback(async () => {
        tokenValidate();
        if (!!customer["CUSTOMER_ID"]) {
            const {data} = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/shopping_ad/campaign?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`);
            setCampaignList(data.campaign_list);
        }
    }, [customer]);

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
        let dt = new Date();
        let year = dt.getFullYear();
        let month = dt.getMonth() + 1;
        let day = dt.getDate();

        let toDay = year + '-' + month + '-' + day;

        if (type === "usedDate") {
            setRadioState({
                ...radioState,
                [type]: e.target.checked ? 1 : 0
            });
            setKeywordOption({
                ...keywordOption,
                start_Date: toDay,
                end_Date: toDay
            });
        }  else {
            setRadioState({
                ...radioState,
                [type]: parseInt(e.target.value)
            });
        }
    }, [keywordOption, radioState]);

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
            case 'bid_adj_amount':
                value = parseInt(value);
                if (isNaN(value)) value = 0;
                setKeywordOption({
                    ...keywordOption,
                    setting: {
                        ...keywordOption.setting,
                        [name]: value
                    }
                });
                break;
            case 'bid_cycle':
            case 'lowest_Bid_ac':
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

    // 날짜 선택
    const onDateChange = (value, type) => {
        let dt = new Date(value);
        let year = dt.getFullYear();
        let month = dt.getMonth() + 1;
        let day = dt.getDate();

        let date = year + '-' + month + '-' + day;

        switch (type) {
            case 'start_Date':
            case 'end_Date':
                setKeywordOption({
                    ...keywordOption,
                    [type]: date
                });
                break;
            default:
                return;
        }
    }

    // 요일, 시간 select box onChange
    const handleHighScheduleSetting = e => {
        const {name, value} = e.target;

        setHighSchedule({
            ...highSchedule,
            [name]: value
        });
    }


    const {week, start, finish} = highSchedule;

    // 스케줄 중복 data finder
    const sameScheduleFinder = schedules => schedules.find(list => keywordOption.setting.target_Rank === list.targetRank && keywordOption.setting.max_bid === list.maxBid && keywordOption.setting.min_bid === list.minBid);

    // 스케줄 추가
    const onAddSchedule = () => {
        if (keywordOption.keyword_info.length === 0) {
            alert('등록하실 키워드를 추가해주세요.');
            return;
        } else if (scheduleChips.length > 4) {
            alert('스케줄은 한번에 최대 5개까지 설정할 수 있습니다.');
            return;
        } else if (keywordOption.setting.target_Rank < 1) {
            alert('희망 순위를 설정해주세요.');
            return;
        } else if (sameScheduleFinder(scheduleChips)) {
            alert('동일한 스케줄이 이미 추가되었습니다.');
            return;
        }

        let chip = {
            id: keywordOption.setting.target_Rank + '-' + keywordOption.setting.max_bid + '-' + keywordOption.setting.min_bid,
            targetRank: keywordOption.setting.target_Rank,
            maxBid: keywordOption.setting.max_bid,
            minBid: keywordOption.setting.min_bid,
            active: false,
            bgColor: scheduleBgColor.shift(),
            mon: [],
            tue: [],
            wed: [],
            thu: [],
            fri: [],
            sat: [],
            sun: [],
        };
        setScheduleChips([...scheduleChips, chip]);
    }

    // 스케줄 click
    const onScheduleClick = id => setScheduleChips(scheduleChips.map(chip => id === chip.id ? {
        ...chip,
        active: !chip.active
    } : {...chip, active: false}));

    // 시간 설정
    const onAddChips = () => {
        let tmp;
        let weekKor = '';
        let copyChips = scheduleChips.find(item => item.active && item);

        if (!copyChips || copyChips.length < 1) {
            alert('추가하신 스케줄을 눌러 선택해주세요.');
            return;
        } else if (week === '' || start === '' || finish === '') {
            alert('요일 및 시간을 설정해주세요.');
            return;
        } else if (parseInt(start) > parseInt(finish)) {
            alert('시작시간은 종료시간보다 빠른시간을 선택해주세요.');
            return false;
        }

        switch (week) {
            case 'mon':
            case 'tue':
            case 'wed':
            case 'thu':
            case 'fri':
            case 'sat':
            case 'sun':
                tmp = [...copyChips[week]];
                weekKor = korWeekChange(week);
                for (let i = parseInt(start); i <= parseInt(finish); i++) tmp.push(i);
                break;
            case 'weekDays':
                let tmpWeekDays = [];
                for (let i = parseInt(start); i <= parseInt(finish); i++) tmpWeekDays.push(i);
                copyChips = {
                    ...copyChips,
                    mon: [...tmpWeekDays],
                    tue: [...tmpWeekDays],
                    wed: [...tmpWeekDays],
                    thu: [...tmpWeekDays],
                    fri: [...tmpWeekDays],
                    sat: [...copyChips.sat],
                    sun: [...copyChips.sun],
                };
                break;
            case 'weekend':
                let tmpWeekend = [];
                for (let i = parseInt(start); i <= parseInt(finish); i++) tmpWeekend.push(i);
                copyChips = {
                    ...copyChips,
                    mon: [...copyChips.mon],
                    tue: [...copyChips.tue],
                    wed: [...copyChips.wed],
                    thu: [...copyChips.thu],
                    fri: [...copyChips.fri],
                    sat: [...tmpWeekend],
                    sun: [...tmpWeekend],
                };
                break;
            case 'all':
                let tmpAll = [];
                for (let i = parseInt(start); i <= parseInt(finish); i++) tmpAll.push(i);
                copyChips = {
                    ...copyChips,
                    mon: [...tmpAll],
                    tue: [...tmpAll],
                    wed: [...tmpAll],
                    thu: [...tmpAll],
                    fri: [...tmpAll],
                    sat: [...tmpAll],
                    sun: [...tmpAll],
                };
                break;
            default:
                weekKor = '';
        }

        // 중복체크
        if (week !== "weekDays" && week !== "weekend" && week !== "all") {
            let weekAllSchedule = [];
            scheduleChips.map(item => item[week].forEach(time => !!time && weekAllSchedule.push(time)));
            let weekDuplicateChecker = weekAllSchedule.find(time => {
                if (time >= parseInt(start) && time <= parseInt(finish))
                    return time;
                else
                    return false;
            });

            if (weekDuplicateChecker) {
                alert(`[${weekKor}요일] ${weekDuplicateChecker}시는 이미 선택하셨습니다.`);
                return;
            }
        } else {
            let tmpWeekDays = [];
            let tmpWeekend = [];
            let tmpAll = [];

            switch (week) {
                case 'weekDays':
                    scheduleChips.forEach(item => {
                        item.mon.forEach(time => !!time && tmpWeekDays.push(time));
                        item.tue.forEach(time => !!time && tmpWeekDays.push(time));
                        item.wed.forEach(time => !!time && tmpWeekDays.push(time));
                        item.thu.forEach(time => !!time && tmpWeekDays.push(time));
                        item.fri.forEach(time => !!time && tmpWeekDays.push(time));
                    });
                    let weekDuplicateChecker = tmpWeekDays.find(time => {
                        if (time >= parseInt(start) && time <= parseInt(finish))
                            return time;
                        else
                            return false;
                    });

                    if (weekDuplicateChecker) {
                        alert(`주중 ${weekDuplicateChecker}시는 이미 선택하셨습니다.`);
                        return;
                    }
                    break;
                case 'weekend':
                    scheduleChips.forEach(item => {
                        item.sat.forEach(time => !!time && tmpWeekend.push(time));
                        item.sun.forEach(time => !!time && tmpWeekend.push(time));
                    });

                    let weekendDuplicateChecker = tmpWeekend.find(time => {
                        console.info('받은 배열 안 시간 : ', time);
                        if (time >= parseInt(start) && time <= parseInt(finish))
                            return time;
                        else
                            return false;
                    });

                    if (weekendDuplicateChecker) {
                        alert(`주말 ${weekendDuplicateChecker}시는 이미 선택하셨습니다.`);
                        return;
                    }
                    break;
                case 'all':
                    scheduleChips.forEach(item => {
                        item.mon.forEach(time => !!time && tmpAll.push(time));
                        item.tue.forEach(time => !!time && tmpAll.push(time));
                        item.wed.forEach(time => !!time && tmpAll.push(time));
                        item.thu.forEach(time => !!time && tmpAll.push(time));
                        item.fri.forEach(time => !!time && tmpAll.push(time));
                        item.sat.forEach(time => !!time && tmpAll.push(time));
                        item.sun.forEach(time => !!time && tmpAll.push(time));
                    });

                    let allDuplicateChecker = tmpAll.find(time => {
                        if (time >= parseInt(start) && time <= parseInt(finish))
                            return time;
                        else
                            return false;
                    });

                    if (allDuplicateChecker) {
                        alert(`전체 중 ${allDuplicateChecker}시는 이미 선택하셨습니다.`);
                        return;
                    }
                    break;
                default:
                    return;
            }
        }


        copyChips = {...copyChips, [week]: tmp};

        let schedules = scheduleChips.map(item => item.active === copyChips.active ? copyChips : item);
        setScheduleChips(schedules);



        // 보낼 양식 데이터 상태에 저장
        let finalArray = [];
        let finalData = {};

        // 2진수 변환
        const getCalculatedValue = (item, weekday) => {
            let rtn = 0;
            item[weekday].map(n => rtn += Math.pow(2, n));
            return rtn;
        };

        schedules.forEach(item => {
            finalData = {
                keyword_info: keywordOption.keyword_info,
                device: keywordOption.device,
                bid_cycle: keywordOption.bid_cycle,
                start_Date: keywordOption.start_Date,
                end_Date: keywordOption.end_Date,
                lowest_Bid_ac: keywordOption.lowest_Bid_ac,
                setting: {
                    mon: getCalculatedValue(item, 'mon').toString(),
                    tue: getCalculatedValue(item, 'tue').toString(),
                    wed: getCalculatedValue(item, 'wed').toString(),
                    thu: getCalculatedValue(item, 'thu').toString(),
                    fri: getCalculatedValue(item, 'fri').toString(),
                    sat: getCalculatedValue(item, 'sat').toString(),
                    sun: getCalculatedValue(item, 'sun').toString(),
                    target_Rank: item.targetRank,
                    max_bid: item.maxBid,
                    min_bid: item.minBid,
                    bid_adj_amount: keywordOption.setting.bid_adj_amount
                }
            }
            finalArray.push(finalData);
        });
        setHighKeywordOption(finalArray);
    }

    // 스케줄 카드 삭제
    const onDeleteChips = id => {
        scheduleBgColor.push(scheduleChips.filter(chip => id === chip.id)[0].bgColor);
        setScheduleChips(scheduleChips.filter(chip => id !== chip.id));
    }

    // 취소
    const onCancel = () => window.location.reload();

    // 자동입찰 등록
    const onAddAutoBid = async () => {
        tokenValidate();
        if (!keywordOption.setting.target_Rank) {
            alert('희망 순위를 설정해주세요.');
            return;
        }
        setLoading(true);

        try {
            // const response = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/shopping_ad?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, radioState.simpleHigh === 0 ? {data: keywordOption} : {data: highKeywordOption});

            const response = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/shopping_ad?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`,
                radioState.simpleHigh === 0
                    ? [keywordOption]
                    : highKeywordOption
            );

            if (response.status === 200) {
                toast.info("키워드 등록이 시작되었습니다.");
                setLoading(false);
                setKeywordList([]);
                setSettingList([]);
                setScheduleChips([]);
                setRadioState({
                    simpleHigh: 0,
                    bid_adj_amount: 0,
                    usedDate: 0
                });
                setKeywordOption({
                    keyword_info: [],
                    device: "PC",
                    bid_cycle: 5,
                    start_Date: "",
                    end_Date: "",
                    lowest_Bid_ac: 0,
                    setting: {
                        mon: '0~23',
                        tue: '0~23',
                        wed: '0~23',
                        thu: '0~23',
                        fri: '0~23',
                        sat: '0~23',
                        sun: '0~23',
                        target_Rank: 0,
                        max_bid: 0,
                        min_bid: 0,
                        bid_adj_amount: 0,
                    }
                });
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    // 광고주 리스트 불러오기
    const fetchCustomerList = useCallback(async () => {
        try {
            const { data } = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/id`);
            setCustomerList(data.id_info);
        } catch(e) {
            throw new Error(e);
        }
    }, []);

    // 간편설정, 고급설정 상태
    useEffect(() => {
        if (radioState.simpleHigh === 1) {
            setKeywordOption({
                ...keywordOption,
                setting: {
                    ...keywordOption.setting,
                    mon: '0',
                    tue: '0',
                    wed: '0',
                    thu: '0',
                    fri: '0',
                    sat: '0',
                    sun: '0',
                }
            });
        }
        // eslint-disable-next-line
    }, [radioState]);

    // 초기 data 불러오기
    useEffect(() => {
        fetchCampaignData();
    }, [fetchCampaignData]);

    useEffect(() => {
        fetchCustomerList();
    }, []);

    // localStorage 광고주 id 가져오기
    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem("customer")));
        return () => setLoading(false);
    }, []);

    // 간편 설정 요일 및 시간 보내기용 데이터로 변환
    useEffect(() => {
        const {week, time} = simpleSchedule;
        if (week === 'all') {
            setKeywordOption({
                ...keywordOption,
                setting: {
                    ...keywordOption.setting,
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
                    ...keywordOption.setting,
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
                    ...keywordOption.setting,
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
        // eslint-disable-next-line
    }, [simpleSchedule]);

    return (
        <AddAutoBidPresenter
            SHOPPING_AD
            title="쇼핑광고 자동입찰등록"
            handleCustomerChange={handleCustomerChange}
            handleKeywordSelected={handleKeywordSelected}
            customerList={customerList}
            customer={customer}
            campaignList={campaignList}
            adGroupList={adGroupList}
            adsList={adsList}
            keywordList={keywordList}
            settingList={settingList}
            onAddSettingBox={onAddSettingBox}
            onDeleteKeyword={onDeleteKeyword}
            keywordOption={keywordOption}
            radioState={radioState}
            handleRadioTab={handleRadioTab}
            onAutoBidChange={onAutoBidChange}
            onDateChange={onDateChange}
            simpleSchedule={simpleSchedule}
            handleSimpleScheduleSetting={handleSimpleScheduleSetting}
            handleHighScheduleSetting={handleHighScheduleSetting}
            scheduleChips={scheduleChips}
            onAddSchedule={onAddSchedule}
            onScheduleClick={onScheduleClick}
            onAddChips={onAddChips}
            onDeleteChips={onDeleteChips}
            onCancel={onCancel}
            onAddAutoBid={onAddAutoBid}
            loading={loading}
            controlProps={controlProps}

            searchInput={searchInput}
            handleSearchReset={handleSearchReset}
            handleSearchClick={handleSearchClick}
            handleSearchInput={handleSearchInput}
        />
    )
}

export default ShoppingADAutoBidContainer;

