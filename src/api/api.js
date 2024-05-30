import axios from "axios";

const Api = axios.create({

    baseURL: "http://localhost:5000/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
}
);

export const testApi = () => Api.get("/")

// creating register api
export const registerUserApi = (data) => Api.post("api/user/register", data)