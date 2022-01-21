import React, {useState, useContext} from 'react';
import SignUpPresenter from "./SignUpPresenter";
import SendRequest from "../../utils/SendRequest";
import * as constants from "../../utils/constants";
import {toast} from "react-toastify";
import {AuthContext} from "../../utils/AuthContext";

const serverPROTOCOL = constants.config.PROTOCOL;
const serverURL = constants.config.URL;

const SignUpContainer = () => {
    const { userLogin } = useContext(AuthContext);

    const [signUpInputs, setSignUpInputs] = useState({
        id: "",
        passwd: "",
        API_KEY: "",
        SECRET_KEY: "",
        CUSTOMER_ID: "",
    });

    const handleInputChange = e => {
        const { name, value } = e.target;

        setSignUpInputs({
           ...signUpInputs,
           [name]: value
        });
    }

    const onSignUp = async () => {
        try {
            const { data } = await SendRequest().post(`${serverPROTOCOL}${serverURL}/User/register-id`, signUpInputs);

            if (data.done) {
                userLogin(data);
            }  else {
                toast.error(data.message);
            }
        } catch(e) {
            throw new Error(e);
        }
    }



    return (
        <SignUpPresenter
            signUpInputs={signUpInputs}
            handleInputChange={handleInputChange}
            onSignUp={onSignUp}
        />
    )
}

export default React.memo(SignUpContainer);