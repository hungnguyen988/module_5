import {checkLogin} from "../service/account";


export function login(loginInfo){
    return async (dispatch) => {
        const account = await checkLogin(loginInfo);
        if(account!= null){
            dispatch({
                type: 'LOGIN',
                payload: account
            });
            return true;
        }else {
            console.log("Tài khoản không tồn tại");
            return false;
        }
    }
}

export function logout(){
    return {
        type: 'LOGOUT',
        payload: null
    }
}