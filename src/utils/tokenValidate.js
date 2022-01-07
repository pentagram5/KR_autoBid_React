import jwt_decode from "jwt-decode";

export const tokenValidate = () => {
    const token = localStorage.getItem("KR_Marketing_token");
    if (!!token) {
        const { exp } = jwt_decode(token);

        if (Date.now() >= exp * 1000) {
            alert('인증 시간이 만료되었습니다. 다시 로그인 해주세요.');
            localStorage.removeItem("KR_Marketing_token");
            window.location.href = '/';
        }

    }
}