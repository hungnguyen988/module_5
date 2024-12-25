import React, {useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/AccountAction";
import {checkLogin} from "../service/account";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function LoginComponent() {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogin = async () => {
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;
        const loginInfo = {username, password};
        let isLoginSuccess = await dispatch(login(loginInfo))
        if (isLoginSuccess) {
            toast.success("đăng nhập thành công!", {
                position: "top-right",
                autoClose: 3000, // Thời gian tự đóng (3 giây)
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate('/list')

        }else {
            toast.error("Sai tên đăng nhập hoặc mật khẩu!", {
                position: "top-right",
                autoClose: 3000, // Th��i gian tự đóng (3 giây)
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }


    }
    return (
        <>

            <h3>Đăng nhập</h3>
            <label>Username:</label><br/>
            <input ref={usernameRef} type="text"/><br/>
            <label>Password:</label><br/>
            <input ref={passwordRef} type="password"/><br/>
            <input type="submit" value="Login" onClick={handleLogin}/>


        </>
    )
}

export default LoginComponent;