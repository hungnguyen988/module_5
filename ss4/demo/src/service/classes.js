import axios from "axios";

export async function getAllClasses() {
    try {
        const response = await axios.get('http://localhost:8080/classes')
        return response.data;
    } catch (error) {
        return [];
    }
}