import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-size: 16px;=
    font-family: 'Noto Sans KR', sans-serif;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    scrollbar-width: none;
    -ms-overflow-style: none;
    body::-webkit-scrollbar {
      display: none;
    }
  }
  a {
    text-decoration: none;
  }
  textarea:focus,
  input:focus{
    outline: none;
  }
  button {
    cursor: pointer;
  }
`;