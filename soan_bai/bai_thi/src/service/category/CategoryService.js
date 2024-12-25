

import axios from 'axios';

export async function  getAllCategories(){
    try {
        const response = await axios.get('http://localhost:8080/categories');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}