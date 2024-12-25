import axios from "axios";


export  async function getAllCustomers() {
    try {
        const response = await axios.get('http://localhost:8080/customers');
        return response.data;
    }catch (error) {
        return null;
    }
}


export  async function getCustomerById(id) {
    try {
        console.log(id+"------")
        const response = await axios.get(`http://localhost:8080/customers/${id}`);
        console.log(response.data+"lấy b��ng id");
        return response.data;

    }catch (error) {
        console.log(error);
        return null;
    }
}