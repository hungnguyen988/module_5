import axios from "axios";


export async function checkLogin(loginInfo) {
    try {
        const response = await axios.get('http://localhost:8080/accounts')
        const account = response.data.find(account => account.username === loginInfo.username && account.password === loginInfo.password);
        if (account != null) {
            return account;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}