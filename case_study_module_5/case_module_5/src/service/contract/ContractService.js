import axios from "axios";

export async function searchByNameAndServiceType(name, serviceType, page, size) {
    let url = `http://localhost:8080/contracts?customer.name_like=${name}&serviceType=${serviceType}&_sort=totalCost&_order=asc&_page=${page}&_limit=${size}`
    if (serviceType === '') {
        url = `http://localhost:8080/contracts?customer.name_like=${name}&_sort=totalCost&_order=asc&_page=${page}&_limit=${size}`
    }
    try {
        const response = await axios.get(url)
        const totalCount = response.headers['x-total-count'];
        const totalPages = Math.ceil(totalCount / size);
        return {list: response.data, total: totalPages};
    } catch (error) {
        return null;
    }
}

export async function getById(id) {
    try {
        const response = await axios.get(`http://localhost:8080/contracts/${id}`)
        console.log(response.data+"lấy bằng id");
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function getLastContractId() {
    try {
        const response = await axios.get('http://localhost:8080/contracts')
        return response.data[response.data.length - 1].id;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function createContract(contract) {
    try {
        const response = await axios.post('http://localhost:8080/contracts', contract)
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteById(id) {
    try {
        const response = await axios.delete(`http://localhost:8080/contracts/${id}`)
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateContract(contract) {
    try {

        const response = await axios.put(`http://localhost:8080/contracts/${contract.id}`, contract)
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

