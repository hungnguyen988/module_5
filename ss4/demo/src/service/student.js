import axios from "axios";





export async function searchByNameAndClassId(name,classId,page,size) {
    let url = `http://localhost:8080/students?name_like=${name}&class.id=${classId}&_sort=age&_order=asc&_page=${page }&_limit=${size}`
    if (classId === '') {

        url = `http://localhost:8080/students?name_like=${name}&_sort=age&_order=asc&_page=${page }&_limit=${size}`
    }
    try {
        const response = await axios.get(url)
        const totalCount = response.headers['x-total-count'];

        // Tổng số trang
        const totalPages = Math.ceil(totalCount /size);
        return {list: response.data, total : totalPages };
    } catch (error) {
        return null;
    }
}


export async function addStudent(student) {
    try {
        const response = await axios.post('http://localhost:8080/students',student)

    } catch (error) {
        console.error(error);
    }
}

export async function deleteById(id) {
    try {
        console.log("id" +id)
        const response = await axios.delete('http://localhost:8080/students/'+id)

    } catch (error) {
        console.error("lỗi"+error);
    }
}

export async function searchById(id) {
    try {
        const response = await axios.get('http://localhost:8080/students/' + id)
        return response.data;
    } catch (error) {
        return null;
    }
}




export async function updateStudent(student) {
    try {
        const response = await axios.put('http://localhost:8080/students/' + student.id, student)

    }catch (error) {
        console.log(error);
    }
}