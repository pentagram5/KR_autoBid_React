import React, {useState, useContext, useEffect, useCallback} from 'react';
import AddAutoBidPresenter from "../../components/addAutoBid/AddAutoBidPresenter";
import {AuthContext} from "../../utils/AuthContext";
import SendRequest from "../../utils/SendRequest";
import * as constants from "../../utils/constants";
import colors from "../../styles/colors";
import {korWeekChange} from "../../utils/common";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

const scheduleBgColor = [colors.pastelRed, colors.pastelYellow, colors.pastelGreen, colors.pastelBlue, colors.pastelPurple];

const PowerContentsAutoBidContainer = () => {
    const {customerList} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
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
    const [keywordOption, setKeywordOption] = useState({
        keyword_info: [],
        device: "PC",
        bid_cycle: 5,
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
        setKeywordList([]);
        setAdGroupList([]);
        setSettingList([]);
    }, [customerList]);


    // 체크된 keyword SettingList 박스에 추가
    const onAddSettingBox = useCallback(() => {
        if (checked.length === 0) {
            alert('추가하실 항목을 선택해주세요.');
            return;
        }
        let newSettingList = [...settingList];

        keywordList.forEach((list, index) => {
            checked.forEach(check => {
                if (list.nccKeywordId === check) {
                    newSettingList.push(list);
                }
            });
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
        const {value} = e.target;
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
                console.info('아추워 :: ', tmpWeekDays);
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

        console.info('copyChips', copyChips);

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
            let weekAllSchedule = [];
            // eslint-disable-next-line array-callback-return
            scheduleChips.map(item => {
                item.mon.forEach(time => !!time && weekAllSchedule.push(time));
                item.tue.forEach(time => !!time && weekAllSchedule.push(time));
                item.wed.forEach(time => !!time && weekAllSchedule.push(time));
                item.thu.forEach(time => !!time && weekAllSchedule.push(time));
                item.fri.forEach(time => !!time && weekAllSchedule.push(time));
                item.sat.forEach(time => !!time && weekAllSchedule.push(time));
                item.sun.forEach(time => !!time && weekAllSchedule.push(time));
            });
            let weekDuplicateChecker = weekAllSchedule.find(time => {
                if (time >= parseInt(start) && time <= parseInt(finish))
                    return time;
                else
                    return false;
            });

            weekAllSchedule = weekAllSchedule.filter((time, index) => weekAllSchedule.indexOf(time) === index);

            if (weekDuplicateChecker) {
                alert(`${week === "weekDays" ? "주중" : week === "weekend" ? "주말" : "전체 요일 중"} ${weekDuplicateChecker}시는 이미 선택하셨습니다.`);
                return;
            }
        }



        copyChips = {...copyChips, [week]: tmp};

        let schedules = scheduleChips.map(item => item.active === copyChips.active ? copyChips : item );
        setScheduleChips(schedules);


        // 보낼 양식 데이터 상태에 저장
        let finalArray = [];
        let finalData = {};

        const getCalculatedValue = (item, weekday) => {
            let rtn = 0;
            item[weekday].map( a => {
                rtn += Math.pow(2, a );
            });
            return rtn;
        };

        schedules.forEach(item => {
            finalData = {
                keyword_info: keywordOption.keyword_info,
                device: keywordOption.device,
                bid_cycle: keywordOption.bid_cycle,
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
                    bid_adj_amount: '0', // item.bidAdjAmount,
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
        if (!keywordOption.setting.target_Rank) {
            alert('희망 순위를 설정해주세요.');
            return;
        }
        setLoading(true);

        try {
            const response = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/powercontents?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, radioState.simpleHigh === 0 ? [keywordOption] : highKeywordOption);

            console.info(response);
            if (response.status === 200) {
                setLoading(false);

                setKeywordList([]);
                setSettingList([]);
                setScheduleChips([]);
                setKeywordOption({
                    keyword_info: [],
                    device: "PC",
                    bid_cycle: 5,
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
    }, [radioState]);

    // 초기 data 불러오기
    useEffect(() => {
        fetchCampaignData();
    }, [fetchCampaignData]);

    // localStorage 광고주 id 가져오기
    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem("customer")));
        return () => setLoading(false);
    }, []);

    // 설정할 keywordOption 상태에 담기
    useEffect(() => {
        setKeywordOption({
            ...keywordOption,
            keyword_info: settingList.map(list => list.nccKeywordId)
        });
    }, [settingList]);

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
    }, [simpleSchedule]);

    useEffect(() => {
        console.info('keywordList ? ::: ', keywordList);
    }, [keywordList]);

    return (
        <AddAutoBidPresenter
            title="파워컨텐츠 자동입찰등록"
            POWER_CONTENTS
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
            onAddSchedule={onAddSchedule}
            onScheduleClick={onScheduleClick}
            onAddChips={onAddChips}
            onDeleteChips={onDeleteChips}
            onCancel={onCancel}
            onAddAutoBid={onAddAutoBid}
            loading={loading}
        />
    )
}

export default React.memo(PowerContentsAutoBidContainer);