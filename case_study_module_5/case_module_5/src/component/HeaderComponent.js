import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/AccountAction";

function HeaderComponent() {
    const user = useSelector(state => state.user);
    const account = user ? user.account : null;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* Phần tử bên trái */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Trang chủ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/list">Danh sách</Link>
                            </li>

                        </ul>

                        {/* Phần tử bên phải (Tài khoản, Đăng nhập, Đăng xuất) */}
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {!account && <Link className="nav-link" to="/login">Đăng nhập</Link>}
                            </li>
                            <li className="nav-item">
                                {account && <button onClick={handleLogout} className="nav-link">Đăng xuất</button>}
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    {account && <span className="nav-link">{account.username}</span>}*/}
                            {/*</li>*/}

                            <li className="nav-item">
                                {account && <span className="account-name">{account.username}</span>}
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default HeaderComponent;
