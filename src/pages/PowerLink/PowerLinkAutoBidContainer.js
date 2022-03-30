import React, {useCallback, useContext, useEffect, useState} from 'react';
import AddAutoBidPresenter from "../../components/addAutoBid/AddAutoBidPresenter";
import SendRequest from "../../utils/SendRequest";
import colors from "../../styles/colors";
import {korWeekChange} from "../../utils/common";
import {tokenValidate} from "../../utils/tokenValidate";
import * as constants from "../../utils/constants";
import {AuthContext} from "../../utils/AuthContext";
import {toast} from "react-toastify";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;
const scheduleBgColor = [colors.pastelRed, colors.pastelYellow, colors.pastelGreen, colors.pastelBlue, colors.pastelPurple];

const PowerLinkAutoBidContainer = () => {
    const { identifier, setIdentifier } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState({});

    const [customerName, setCustomerName] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [customerList, setCustomerList] = useState([]);
    const [checked, setChecked] = useState([]);
    const [campaignList, setCampaignList] = useState([]);
    const [adGroupList, setAdGroupList] = useState([]);
    const [keywordList, setKeywordList] = useState([]);
    const [initialKeywordList, setInitialKeywordList] = useState([]);
    const [settingList, setSettingList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [keywordId, setKeywordId] = useState({
        nccCampaignId: "캠페인명 설정",
        nccAdgroupId: "",
        nccKeywordId: "",
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
            min_bid: 70,
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

    // 검색 onChange
    const handleSearchInput = useCallback(e => setSearchInput(e.target.value), []);
    // 검색
    const handleSearchClick = useCallback(async () => {
        tokenValidate();
        try {
            const {data} = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/powerlink/keywords/search?CUSTOMER_ID=${customer["CUSTOMER_ID"]}&nccAdgroupId=${keywordId.nccAdgroupId}`, {
                word: searchInput
            });
            if (data.done) {
                setKeywordList(data.keywords_list);
            } else {
                alert('캠페인, 광고그룹명을 설정 후 검색해주세요.');
                return;
            }
        } catch (e) {
            throw new Error(e);
        }
        setSearchInput("");
    }, [customer, keywordId.nccAdgroupId, searchInput]);

    const handleSearchReset = () => {
        setSearchInput("");
        setKeywordList(initialKeywordList);
    }

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
        } else {
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
                value = parseInt(value.replace(/[^-0-9]/g,''), 10);
                if (isNaN(value)) value = 0;
                setKeywordOption({
                    ...keywordOption,
                    setting: {
                        ...keywordOption.setting,
                        [name]: value
                    }
                });
                break;
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
        else newChecked = newChecked.concat(checked.slice(0, checkedIndex), checked.slice(checkedIndex + 1));

        setChecked(newChecked);
    }, [checked]);

    // 광고주 변경 모달
    const handleConfirmClose = useCallback(() => setConfirmOpen(false), []);

    // confirm 모달 버튼
    const onConfirmChange = useCallback(() => {
        const list = customerList.find(list => list.CUSTOMER_ID === customerId);

        setCustomer(list);
        localStorage.setItem("customer", JSON.stringify(list));
        setKeywordList([]);
        setAdGroupList([]);
        setSettingList([]);

        setConfirmOpen(false);
    }, [customerId, customer]);

    const onConfirmCancel = useCallback(() => {
        setConfirmOpen(false);
    }, []);

    // 광고주 select 선택
    const handleCustomerChange = useCallback(e => {
        const data = e.target.value.split('__');
        setConfirmOpen(true);
        setCustomerId(data[0]);
        setCustomerName(data[1]);
    }, [customerList, customerId, customerName]);

    // 체크된 keyword SettingList 박스에 추가
    const onAddSettingBox = useCallback(() => {
        if (checked.length === 0) {
            alert('추가하실 항목을 선택해주세요.');
            return;
        }
        let newSettingList = [...settingList];
        // 체크된 것들 setting list 에 담기
        keywordList.forEach((list, index) => checked.forEach(check => {
            if (list.nccKeywordId === check && (settingList[index] && settingList[index].nccKeywordId) !== check) newSettingList.push(list)
        }));


        // 다중 선택 중복 제거
        newSettingList = newSettingList.reduce((unique, item, index) => unique.includes(item) ? unique : [...unique, item], []);

        setSettingList(newSettingList);
        setChecked([]);
    }, [checked, keywordList, settingList]);

    // SettingList keyword 삭제
    const onDeleteKeyword = useCallback(nccKeywordId => {
        setSettingList(settingList.filter(list => list.nccKeywordId !== nccKeywordId));
    }, [settingList]);

    // 입찰 키워드 select 선택
    const handleKeywordSelected = useCallback(async (e, type) => {
        tokenValidate();
        const {value} = e.target;
        if (value === "") return;
        try {
            const {data} = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/powerlink/${type === "nccCampaignId" ? "adgroup" : "keywords"}?CUSTOMER_ID=${customer["CUSTOMER_ID"]}&${type}=${value}`);

            setKeywordId({
                ...keywordId,
                [type]: value,
            });

            if (type === "nccCampaignId") setAdGroupList(data.adgroup_list);
            else {
                setKeywordList(data.keywords_list);
                setInitialKeywordList(data.keywords_list);
            }
        } catch (e) {
            throw new Error(e);
        }
    }, [customer, keywordId]);

    // 캠페인 리스트 불러오기
    const fetchCampaignData = useCallback(async () => {
        tokenValidate();
        try {
            if (!!customer["CUSTOMER_ID"]) {
                const {data} = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/powerlink/campaign?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`);
                setCampaignList(data.campaign_list);
            }
        } catch(e) {
            throw new Error(e);
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

        let schedules = scheduleChips.map(item => item.active === copyChips.active ? copyChips : item);
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
        let targetRank = id.split('-')[0];
        let minBid = id.split('-')[1];
        let maxBid = id.split('-')[2];

        scheduleBgColor.push(scheduleChips.filter(chip => id === chip.id)[0].bgColor);
        setScheduleChips(scheduleChips.filter(chip => id !== chip.id));
        setHighKeywordOption(highKeywordOption.filter(list => list.target_Rank === targetRank && list.min_bid === minBid && list.max_bid === maxBid));
    }

    // 취소
    const onCancel = () => window.location.reload();

    // 자동입찰 등록
    const onAddAutoBid = async () => {
        tokenValidate();
        if (identifier !== "") {
            alert("아직 진행중인 입찰등록이 있습니다.");
            return;
        } else if (!keywordOption.setting.target_Rank) {
            alert('희망 순위를 설정해주세요.');
            return;
        } else if ((!!radioState.simpleHigh) && (highKeywordOption.length < 1)) {
            alert('스케줄의 시간을 설정해주세요.');
            return;
        } else if (keywordOption.setting.min_bid < 70) {
            alert('최소입찰가는 최소 70원 이상으로 입력해주세요.');
            return;
        }
        if ((!radioState.simpleHigh) && (keywordOption.setting.max_bid !== 0 && (keywordOption.setting.min_bid >= keywordOption.setting.max_bid))) {
            alert("최대 입찰가는 최소 입찰가보다 큰 금액을 입력해주세요.");
            return;
        }
        setLoading(true);

        try {
            const response = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/powerlink?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, radioState.simpleHigh === 0 ? [keywordOption] : highKeywordOption);

            if (response.status === 200) {
                setIdentifier(response.data.identifier);

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
                        min_bid: 70,
                        bid_adj_amount: 0,
                    }
                });
            }
        } catch (e) {
            toast.error(e);
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
        } else {
            setSimpleSchedule({
                week: 'all',
                time: '0~23',
            });
        }
    }, [radioState]);

    // 광고주 리스트 불러오기
    const fetchCustomerList = useCallback(async () => {
        try {
            const { data } = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/id`);
            setCustomerList(data.id_info);
        } catch(e) {
            throw new Error(e);
        }
    }, []);

    // 대량 등록 템플릿 다운로드
    const handleTemplateDownload = useCallback(async () => {
        tokenValidate();
        try {
            const res = await SendRequest().get(`${serverPROTOCOL}${serverURL}/autobid/powerlink/xlsx?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([res.data], {
                type: res.headers['content-type'],
            }));

            const fileName = res.headers["content-disposition"].split("=")[1];
            let link = document.createElement('a');

            link.href = url;
            link.download = fileName;
            link.target = '_blank';
            link.click();
            window.URL.revokeObjectURL(link);
            link.remove();
        } catch(e) {
            throw new Error(e);
        }
    }, []);

    // 대량 등록 템플릿 업로드
    const handleTemplateUpload = useCallback(async e => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append("file", file);

        try {
            const res = await SendRequest().post(`${serverPROTOCOL}${serverURL}/autobid/powerlink/xlsx?CUSTOMER_ID=${customer["CUSTOMER_ID"]}`, formData);
            setIdentifier(res.data.identifier);
        } catch(e) {
            throw new Error(e);
        }
    }, [customer]);

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
        // eslint-disabled-next-line
    }, [simpleSchedule]);

    return (
        <AddAutoBidPresenter
            POWER_LINK
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

            searchInput={searchInput}
            handleSearchReset={handleSearchReset}
            handleSearchClick={handleSearchClick}
            handleSearchInput={handleSearchInput}

            confirmOpen={confirmOpen}
            handleConfirmClose={handleConfirmClose}
            customerName={customerName}
            onConfirmChange={onConfirmChange}
            onConfirmCancel={onConfirmCancel}

            handleTemplateDownload={handleTemplateDownload}
            handleTemplateUpload={handleTemplateUpload}
        />
    )
}

export default React.memo(PowerLinkAutoBidContainer);