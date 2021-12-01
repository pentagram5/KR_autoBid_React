import React, { useState, useContext } from 'react';
import LoginPresenter from "./LoginPresenter";
import {toast} from "react-toastify";
import {AuthContext} from "../../utils/AuthContext";
import SendRequest from "../../utils/SendRequest";

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
            const { data } = await SendRequest().post('/User/login', {
                id: id,
                passwd: passwd
            });

            if (!data.done) {
                toast.error(data.message);
            } else {
                userLogin(data);
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