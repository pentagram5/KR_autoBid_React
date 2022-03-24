import React, {useState, useContext, useEffect, useCallback} from 'react';
import {AuthContext} from "../../utils/AuthContext";
import SendRequest from "../../utils/SendRequest";
import colors from "../../styles/colors";
import {korWeekChange} from "../../utils/common";
import UpdateAutoBidPresenter from "../../components/addAutoBid/UpdateAutoBidPresenter";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import * as constants from "../../utils/constants";
import {tokenValidate} from "../../utils/tokenValidate";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

const PowerLinkAutoBidContainer = () => {
    const navigate = useNavigate();
    const {customerList} = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState({});
    const [checked, setChecked] = useState([]);

    const [keywordList, setKeywordList] = useState([]);

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
            setKeywordOption({
                ...keywordOption,
                start_Date: e.target.checked ? toDay : "",
                end_Date: e.target.checked ? toDay : ""
            });
        } else if (type === "simpleHigh") {
            setRadioState({
                ...radioState,
                [type]: parseInt(e.target.value)
            });
            setKeywordOption({
                ...keywordOption,
                setting: {
                    ...keywordOption.setting,
                    mon: '0~23',
                    tue: '0~23',
                    wed: '0~23',
                    thu: '0~23',
                    fri: '0~23',
                    sat: '0~23',
                    sun: '0~23',
                }
            });
        } else {
            let value = parseInt(e.target.value, 10);
            setRadioState({
                ...radioState,
                [type]: parseInt(e.target.value)
            });
            setKeywordOption({
                ...keywordOption,
                setting: {
                    ...keywordOption.setting,
                    bid_adj_amount: !!value ? keywordOption.setting.bid_adj_amount : 0
                }
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

        if (type === "end_Date") {
            let startDate = new Date(keywordOption.start_Date);

            if (startDate > dt) {
                alert("종료날짜는 시작날짜 이후의 날짜만 선택가능합니다.");
                return;
            }
        }

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

    // SettingList keyword 삭제
    const onDeleteKeyword = useCallback(nccKeywordId => {
        setKeywordList(keywordList.filter(list => list.nccKeywordId !== nccKeywordId));
    }, [keywordList]);


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
        } else if (keywordOption.setting.min_bid < 70) {
            alert('최소입찰가는 최소 70원 이상으로 입력해주세요.');
            return;
        } else if (keywordOption.setting.max_bid !== 0 && (keywordOption.setting.min_bid >= keywordOption.setting.max_bid)) {
            alert("최대 입찰가는 최소 입찰가보다 큰 금액을 입력해주세요.");
            return;
        }

        let chip = {
            id: keywordOption.setting.target_Rank + '-' + keywordOption.setting.max_bid + '-' + keywordOption.setting.min_bid,
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

        let currentChip = scheduleChips.find(obj => obj.id === copyChips.id);

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
                    mon: [...currentChip.mon, ...tmpWeekDays],
                    tue: [...currentChip.tue, ...tmpWeekDays],
                    wed: [...currentChip.wed, ...tmpWeekDays],
                    thu: [...currentChip.thu, ...tmpWeekDays],
                    fri: [...currentChip.fri, ...tmpWeekDays],
                    sat: [...currentChip.sat, ...copyChips.sat],
                    sun: [...currentChip.sun, ...copyChips.sun],
                };
                break;
            case 'weekend':
                let tmpWeekend = [];
                for (let i = parseInt(start); i <= parseInt(finish); i++) tmpWeekend.push(i);
                copyChips = {
                    ...copyChips,
                    mon: [...currentChip.mon, ...copyChips.mon],
                    tue: [...currentChip.tue, ...copyChips.tue],
                    wed: [...currentChip.wed, ...copyChips.wed],
                    thu: [...currentChip.thu, ...copyChips.thu],
                    fri: [...currentChip.fri, ...copyChips.fri],
                    sat: [...currentChip.sat, ...tmpWeekend],
                    sun: [...currentChip.sun, ...tmpWeekend],
                };
                break;
            case 'all':
                let tmpAll = [];
                for (let i = parseInt(start); i <= parseInt(finish); i++) tmpAll.push(i);
                copyChips = {
                    ...copyChips,
                    mon: [...currentChip.mon, ...tmpAll],
                    tue: [...currentChip.tue, ...tmpAll],
                    wed: [...currentChip.wed, ...tmpAll],
                    thu: [...currentChip.thu, ...tmpAll],
                    fri: [...currentChip.fri, ...tmpAll],
                    sat: [...currentChip.sat, ...tmpAll],
                    sun: [...currentChip.sun, ...tmpAll],
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

        let schedules = scheduleChips.map(item => item.active === copyChips.active ? copyChips : item );
        setScheduleChips(schedules);


        // 보낼 양식 데이터 상태에 저장
        let finalArray = [];
        let finalData = {};

        const getCalculatedValue = (item, weekday) => {
            let rtn = 0;
            item[weekday].map(x => rtn += Math.pow(2, x));
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
                    bid_adj_amount: keywordOption.setting.bid_adj_amount,
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

    useEffect(() => {
        const getCalculatedValue = (item) => {
            let rtn = 0;
            item.map(x => rtn += Math.pow(2, x));
            return rtn;
        };
        let finalArray = scheduleChips.map(chip => {
            return {
                keyword_info: keywordOption.keyword_info,
                device: keywordOption.device,
                bid_cycle: keywordOption.bid_cycle,
                start_Date: keywordOption.start_Date,
                end_Date: keywordOption.end_Date,
                lowest_Bid_ac: keywordOption.lowest_Bid_ac,
                setting: {
                    mon: getCalculatedValue(chip.mon),
                    tue: getCalculatedValue(chip.tue),
                    wed: getCalculatedValue(chip.wed),
                    thu: getCalculatedValue(chip.thu),
                    fri: getCalculatedValue(chip.fri),
                    sat: getCalculatedValue(chip.sat),
                    sun: getCalculatedValue(chip.sun),
                    target_Rank: chip.targetRank,
                    max_bid: chip.maxBid,
                    min_bid: chip.minBid,
                    bid_adj_amount: chip.bid_adj_amount
                }
            }
        });
        setHighKeywordOption(finalArray);
    }, [keywordOption, scheduleChips]);

    // 자동입찰 등록
    const onAddAutoBid = async () => {
        tokenValidate();
        if (!keywordOption.setting.target_Rank) {
            alert('희망 순위를 설정해주세요.');
            return;
        }
        if ((!radioState.simpleHigh) && (keywordOption.setting.max_bid !== 0 && (keywordOption.setting.min_bid > keywordOption.setting.max_bid))) {
            alert("최대 입찰가는 최소 입찰가보다 큰 금액을 입력해주세요.");
            return;
        } else if (keywordOption.setting.min_bid < 70) {
            alert('최소입찰가는 최소 70원 이상으로 입력해주세요.');
            return;
        }
        setLoading(true);

        try {
            const response = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/powercontents/update?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, radioState.simpleHigh === 0 ? [keywordOption] : highKeywordOption);

            if (response.status === 200) {
                toast.info('키워드를 수정했습니다.')
                setLoading(false);
                setKeywordList([]);
                setRadioState({
                    simpleHigh: 0,
                    bid_adj_amount: 0,
                    usedDate: 0
                });
                setScheduleChips([]);
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
                setTimeout(() => {
                    navigate('/powerContentsKeyword');
                }, 800);
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
    }, [simpleSchedule]);

    useEffect(() => {
        console.info('radioState,', radioState)
    }, [radioState]);

    const fetchingData = async customerId => {
        tokenValidate();
        try {
            const { data } = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/powercontents/update_info?CUSTOMER_ID=${customerId}`, checked);

            // setKeywordList(data);
            if (checked.length > 1) { // 수정리스트 하나 이상일 때
                setKeywordList(data.keyword_info);
                setKeywordOption({
                    ...keywordOption,
                    keyword_info: data.keyword_info.map(list => list.nccKeywordId)
                });
            } else { // 수정리스트 하나 일 때
                setKeywordList(data.keyword_info);
                setRadioState({
                    bid_adj_amount: data.keyword_setting.setting[0].bid_adj_amount > 0 ? 1 : 0,
                    simpleHigh: data.setting_type,
                    usedDate: !!data.keyword_setting.start_Date ? data.keyword_setting.start_Date : 0
                });

                // 간편설정
                if (data.setting_type === 0) {
                    setKeywordOption({
                        keyword_info: [data.keyword_info[0].nccKeywordId],
                        device: data.keyword_setting.device,
                        bid_cycle: parseInt(data.keyword_setting.bid_cycle, 10),
                        start_Date: data.keyword_setting.start_Date ? data.keyword_setting.start_Date : "",
                        end_Date: data.keyword_setting.end_Date ? data.keyword_setting.end_Date : "",
                        lowest_Bid_ac: data.keyword_setting.lowest_Bid_ac,
                        setting: {
                            ...keywordOption.setting,
                            target_Rank: data.keyword_setting.setting[0].target_Rank,
                            max_bid: data.keyword_setting.setting[0].max_bid,
                            min_bid: data.keyword_setting.setting[0].min_bid,
                            bid_adj_amount: data.keyword_setting.setting[0].bid_adj_amount
                        }
                    });
                    setSimpleSchedule({
                        week: data.weekType,
                        time: data.timeType,
                    });
                } else {
                    let chips = [];

                    // 스케줄 칩
                    data.keyword_setting.setting.map((data, index) => {
                        chips.push({
                            id: data.target_Rank + '-' + data.max_bid + '-' + data.min_bid,
                            targetRank: parseInt(data.target_Rank, 10),
                            maxBid: data.max_bid,
                            minBid: data.min_bid,
                            active: index === 0,
                            bgColor: scheduleBgColor[index],
                            bid_adj_amount: data.bid_adj_amount,
                            mon: data.mon,
                            tue: data.tue,
                            wed: data.wed,
                            thu: data.thu,
                            fri: data.fri,
                            sat: data.sat,
                            sun: data.sun,
                        });
                    });

                    setScheduleChips(chips);

                    setKeywordOption({
                        keyword_info: [data.keyword_info[0].nccKeywordId],
                        device: data.keyword_setting.device,
                        bid_cycle: parseInt(data.keyword_setting.bid_cycle, 10),
                        start_Date: data.keyword_setting.start_Date ? data.keyword_setting.start_Date : "",
                        end_Date: data.keyword_setting.end_Date ? data.keyword_setting.end_Date : "",
                        lowest_Bid_ac: data.keyword_setting.lowest_Bid_ac,
                        setting: {
                            ...keywordOption.setting,
                            target_Rank: parseInt(data.keyword_setting.setting[0].target_Rank, 10),
                            max_bid: data.keyword_setting.setting[0].max_bid,
                            min_bid: data.keyword_setting.setting[0].min_bid,
                            bid_adj_amount: data.keyword_setting.setting[0].bid_adj_amount,
                        }
                    });
                }
            }

        } catch(e) {
            throw new Error(e);
        }
    }

    useEffect(() => {
        const arr = localStorage.getItem("checked");
        setCustomer(JSON.parse(localStorage.getItem("customer")));
        if (arr) {
            setChecked(arr.split(','));
        } else {
            toast.info('수정할 키워드가 없습니다.', {
                autoClose: 1000
            });
            navigate('/powerContentsKeyword');
        }

        return () => localStorage.removeItem("checked");
    }, []);

    useEffect(() => {
        if (!!customer["CUSTOMER_ID"] && checked.length !== 0) {
            fetchingData(customer["CUSTOMER_ID"]);
        }
    }, [customer, checked]);


    useEffect(() => {
        setKeywordOption({
            ...keywordOption,
            keyword_info: keywordList.map(list => list.nccKeywordId)
        });
    }, [keywordList]);


    return (
        <UpdateAutoBidPresenter
            POWER_CONTENTS
            title="파워콘텐츠 자동입찰수정"
            customerList={customerList}
            customer={customer}

            keywordList={keywordList}
            checked={checked}
            onDeleteKeyword={onDeleteKeyword}
            onDateChange={onDateChange}

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

export default React.memo(PowerLinkAutoBidContainer);