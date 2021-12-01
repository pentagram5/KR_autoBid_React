import axios from "axios";

export const IS_LOGIN = "IS_LOGIN";
export const IS_LOGOUT = "IS_LOGOUT";
export const SET_TOKEN = "SET_TOKEN";

export const isLogin = token => async dispatch => {
    try {
        dispatch({type: IS_LOGIN, payload: token});
        await localStorage.setItem("token", "cms_admin_token_example");
        setTimeout(() => {
            window.location.reload();
        }, 500);


    } catch (e) {
        throw new Error(e);
    }
}
export const isLogout = () => dispatch => {
    dispatch({type: IS_LOGOUT});
    localStorage.removeItem("token");
    setTimeout(() => {
        window.location.reload();
    }, 500);
}
export const setToken = token => dispatch => dispatch({type: SET_TOKEN, payload: token});

const initialState = {
    token: null,
    userInfo: null,
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case IS_LOGIN:
            return {
                ...state,
                token: action.payload
            }
        case IS_LOGOUT:
            return initialState;
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            }
        default:
            return state;
    }
}



