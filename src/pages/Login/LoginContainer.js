import React, { useState, useContext } from 'react';
import LoginPresenter from "./LoginPresenter";
import axios from "axios";
import {AuthContext} from "../../utils/AuthContext";
import * as constants from "../../utils/Constants";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

const LoginContainer = () => {
    const { userLogin } = useContext(AuthContext);

    const [inputs, setInputs] = useState({
        id: '',
        passwd: '',
    });
    const { id, passwd } = inputs;
    const onInputChange = e => {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
           [name]: value
        });
    }
    const handleLogin = async () => {
        if (id === '' || passwd === '') {
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        }

        try {
            const { data } = await axios.post(`${serverPROTOCOL}${serverURL}/User/login`, {
                id: id,
                passwd: passwd
            });
            if (!data.done) {
                alert(data.message);
            } else {
                userLogin(data.token);
            }

        } catch(e) {
            throw new Error(e);
        }
    }

    return (
        <LoginPresenter
            id={id}
            passwd={passwd}
            onInputChange={onInputChange}
            handleLogin={handleLogin}
        />
    )
}

export default LoginContainer;