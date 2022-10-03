import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8888'
});


// при каждом запросе на сервер проверяем лежит ли в ЛС токен
// если пользователь авторизован - он там лежит
instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config
});



export default instance;