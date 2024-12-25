import axios from "axios";

export async function searchProductByNameAndCategory(searchName, searchCategoryId) {
    let url = `http://localhost:8080/products?name_like=${searchName}&category.id=${searchCategoryId}&_sort=name&_order=asc`;
    if (searchCategoryId === '') {
        url = `http://localhost:8080/products?name_like=${searchName}&_sort=price&_order=asc`;
    }
    try {
        const response = await axios.get(url);

       return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function addProduct(product) {
    try {
        const response = await axios.post('http://localhost:8080/products', product);

    } catch (error) {
        console.error(error);

    }
}

export async function deleteProducts(product) {
    try {
        const response = await axios.delete(`http://localhost:8080/products/${product.id}`);

    } catch (error) {
        console.error(error);

    }
}

export async function getProductById(id) {
    try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);

        return response.data;
    } catch (error) {
        console.error(error);
        return null;

    }
}

export async function updateProduct(product) {
    try {
        const response = await axios.put(`http://localhost:8080/products/${product.id}`,product);

    } catch (error) {
        console.error(error);

    }
}