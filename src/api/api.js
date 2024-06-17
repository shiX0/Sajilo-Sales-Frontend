import axios from "axios";

const Api = axios.create({

    baseURL: "http://localhost:5000/",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data"
    }
}
);

const config = {
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
}


export const testApi = () => Api.get("/")

// creating register api
export const registerUserApi = (data) => Api.post("api/user/register", data)
export const loginUserApi = (data) => Api.post("api/user/login", data)


// Product related apis
// Get All Products
export const getAllProductApi = () => Api.get("/api/product/products");

// create a product
export const createProductApi = (data) => Api.post("/api/product/create", data)

// Get a Single Product by ID
export const getProductByIdApi = (id) => Api.get(`/api/product/${id}`);

// Updatea Product by ID
export const updateProductApi = (id, data) => Api.put(`/api/product/update/${id}`, data)
// Delete a Product by ID
export const deleteProductByIdApi = (id) => Api.delete(`/api/product/delete/${id}`);