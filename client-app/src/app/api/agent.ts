import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { User, UserLoginFormValues } from '../models/user';
import { store } from '../stores/store';

const sleep = (delay: number) =>{
    return new Promise((reslove) => {
        setTimeout(reslove,delay);
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response =>{
   if(process.env.NODE_ENV ==='development') await sleep(1000);

    return response;
},(error: AxiosError) =>{
    const {data,status} = error.response!;

    switch(status){
        case 400:
            console.log(data.errors);
            break;
        case 401:
            console.log('unauthorise');
            toast.error('Problem z autoryzacją');
            break;
        case 404:
            console.log('not found');
            break;
        case 500:
            console.log('server error');
            break;        
    }
    return Promise.reject(error);
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const request = {
    get: <T> (url:string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url,body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url,body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Account ={
    current: () => request.get<User>('/account'),
    login: (user: UserLoginFormValues) => request.post<User>('/account/login',user),
}

const agent = {
    Account
}

export default agent;