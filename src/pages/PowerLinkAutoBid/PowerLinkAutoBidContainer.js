import React, {useState, useContext, useEffect, useCallback} from 'react';
import AddAutoBidPresenter from "../../components/addAutoBid/AddAutoBidPresenter";
import {AuthContext} from "../../utils/AuthContext";
import SendRequest from "../../utils/SendRequest";
import * as constants from "../../utils/constants";
import colors from "../../styles/colors";
import {toast} from "react-toastify";
import {korWeekChange} from "../../utils/common";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

const PowerLinkAutoBidContainer = () => {
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


    /////////////
    // 고급 설정 //
    ////////////
    // 간편 설정 요일 및 시간 data 변환
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
        fetchCampaignData();
    }, [fetchCampaignData]);

    useEffect(() => {
        setCustomer(JSON.parse(localStorage.getItem("customer")));
        return () => setLoading(false);
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
    let mondaySelectionFlag = 0;
    selections.mon.forEach((x, i) => mondaySelectionFlag += Math.pow(2, x));
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

    const scheduleBgColor = [colors.pastelRed, colors.pastelYellow, colors.pastelGreen, colors.pastelBlue, colors.pastelPurple];
    const {week, start, finish} = highSchedule;

    // 스케줄 중복 data finder
    const sameScheduleFinder = schedules => schedules.find(list => keywordOption.setting.target_Rank === list.targetRank && keywordOption.setting.max_bid === list.maxBid && keywordOption.setting.min_bid === list.minBid);

    useEffect(() => {
        console.info('keywordOption ::: ', keywordOption.setting);
    }, [keywordOption]);

    // 스케줄 추가
    const onAddSchedule = () => {
        if (scheduleChips.length > 4) {
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
            targetRank: keywordOption.setting.target_Rank,
            maxBid: keywordOption.setting.max_bid,
            minBid: keywordOption.setting.min_bid,
            active: false,
            bgColor: scheduleBgColor[scheduleChips.length],
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
    const onScheduleClick = index => setScheduleChips(scheduleChips.map((chip, idx) => index === idx ? {
        ...chip,
        active: !chip.active
    } : {...chip, active: false}));


    useEffect(() => {
        console.info('scheduleChips : ', scheduleChips)
    }, [scheduleChips]);

    // 시간 설정
    const onAddChips = () => {
        if (week === '' || start === '' || finish === '') {
            alert('요일 및 시간을 설정해주세요.');
            return;
        } else if (parseInt(start) > parseInt(finish)) {
            alert('시작시간은 종료시간보다 빠른시간을 선택해주세요.');
            return false;
        }

        let tmp;
        let weekKor = '';
        let copyChips = scheduleChips.find(item => item.active && item);

        console.info(copyChips);

        if (!copyChips || copyChips.length < 1) {
            alert('추가하신 스케줄을 눌러 선택해주세요.');
            return;
        }


        switch (week) {
            case 'mon':
            case 'tue':
            case 'web':
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
                setSelections({
                    mon: [...copyChips.mon, tmpWeekDays],
                    tue: [...copyChips.tue, tmpWeekDays],
                    wed: [...copyChips.wed, tmpWeekDays],
                    thu: [...copyChips.thu, tmpWeekDays],
                    fri: [...copyChips.fri, tmpWeekDays],
                    sat: [...copyChips.sat, tmpWeekDays],
                    sun: [...copyChips.sun, tmpWeekDays],
                });
                break;
            case 'weekend':
                let tmpWeekend = [];
                for (let i = parseInt(start); i <= parseInt(finish); i++) tmpWeekend.push(i);
                setSelections({
                    mon: [...copyChips.mon],
                    tue: [...copyChips.tue],
                    wed: [...copyChips.wed],
                    thu: [...copyChips.thu],
                    fri: [...copyChips.fri],
                    sat: [...copyChips.sat, tmpWeekend],
                    sun: [...copyChips.sun, tmpWeekend],
                });
                break;
            case 'all':
                let tmpAll = [];
                for (let i = parseInt(start); i <= parseInt(finish); i++) tmpAll.push(i);
                setSelections({
                    mon: [...copyChips.mon, tmpAll],
                    tue: [...copyChips.tue, tmpAll],
                    wed: [...copyChips.wed, tmpAll],
                    thu: [...copyChips.thu, tmpAll],
                    fri: [...copyChips.fri, tmpAll],
                    sat: [...copyChips.sat, tmpAll],
                    sun: [...copyChips.sun, tmpAll],
                });
                break;
            default:
                weekKor = '';
        }


        let selectedValue = copyChips[week].find(time => {
            if (time >= parseInt(start) && time <= parseInt(finish))
                return time;
            else
                return false;
        });

        if (selectedValue) {
            alert(`[${weekKor}요일] ${selectedValue}시는 이미 선택하셨습니다.`);
            return;
        }

        copyChips = {...copyChips, [week]: tmp};

        // for (let i = parseInt(start); i <= parseInt(finish); i++) {
        //     console.info('for 문 내부 ::: ', i);
        //     tmp.push(i);
        // }
        // setSelections({...selections, [week]: tmp});

        setScheduleChips(scheduleChips.map(item => item.active === copyChips.active ? copyChips : item ));
    }

    const onDeleteChips = (item) => {
        // setScheduleChips(scheduleChips.filter(chip => chip !== item));
        scheduleChips.map(chip => {
            console.info('chip ::: ', chip);
        });
    }

    const onCancel = () => {
        window.location.reload();
    }

    const onAddAutoBid = async () => {
        if (keywordOption.keyword_info.length === 0) {
            alert('등록하실 키워드를 추가해주세요.');
            return;
        } else if (!keywordOption.setting.target_Rank) {
            alert('희망 순위를 설정해주세요.');
            return;
        }

        setLoading(true);
        try {
            const response = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/powerlink?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, [keywordOption]);

            console.info(response);
            if (response.status === 200) {
                setLoading(false);

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
                setKeywordList([]);
            }

        } catch (e) {
            throw new Error(e);
        }
    }

    useEffect(() => {
        setKeywordOption({
            ...keywordOption,
            keyword_info: settingList.map(list => list.nccKeywordId)
        });
    }, [settingList]);


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
            simpleSchedule={simpleSchedule}
            handleSimpleScheduleSetting={handleSimpleScheduleSetting}
            handleHighScheduleSetting={handleHighScheduleSetting}
            scheduleChips={scheduleChips}
            onAddSchedule={onAddSchedule}
            onScheduleClick={onScheduleClick}
            onAddChips={onAddChips}
            onDeleteChips={onDeleteChips}
            selections={selections}
            onCancel={onCancel}
            onAddAutoBid={onAddAutoBid}
            loading={loading}
        />
    )
}

export default React.memo(PowerLinkAutoBidContainer);
