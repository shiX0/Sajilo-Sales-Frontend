import axios from "axios";

const baseURL = {
    baseURL: "http://localhost:5000/api/",
    withCredentials: true,
};

const Api = axios.create({
    ...baseURL,
    headers: {
        "Content-Type": "application/json"
    }
});

const ApiFormData = axios.create({
    ...baseURL,
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

const addTokenToRequest = (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

Api.interceptors.request.use(addTokenToRequest);
ApiFormData.interceptors.request.use(addTokenToRequest);


export const testApi = () => Api.get("/")

// creating register api
export const registerUserApi = (data) => Api.post("user/register", data)
export const loginUserApi = (data) => Api.post("user/login", data)
export const forgotPasswordApi = (data) => Api.post("user/forgotpassword", data)
export const resetPasswordApi = (data) => Api.post("user/resetpassword", data)


// Product related apis
// Get All Products
export const getAllProductApi = (data) => Api.get("product/", { params: data });
// create a product
export const createProductApi = (data) => ApiFormData.post("product/create", data)
// Get a Single Product by ID
export const getProductByIdApi = (id) => Api.get(`product/${id}`);
// Updatea Product by ID
export const updateProductApi = (id, data) => ApiFormData.put(`product/update/${id}`, data)
// Delete a Product by ID
export const deleteProductByIdApi = (id) => Api.delete(`product/delete/${id}`);


export const customerApi = {
    create: (data) => Api.post("customer/create", data),
    getAll: () => Api.get("customer"),
    getById: (id) => Api.get(`customer/${id}`),
    update: (id, data) => Api.put(`customer/update/${id}`, data),
    delete: (id) => Api.delete(`customer/delete/${id}`),
};

export const orderApi = {
    getAll: () => Api.get('/'),
    getById: (id) => Api.get(`/${id}`),
    create: (data) => Api.post('/create', data),
    update: (id, data) => Api.put(`/${id}`, data),
    delete: (id) => Api.delete(`/${id}`),
};