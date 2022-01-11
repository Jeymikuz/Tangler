import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Integration, NewIntegration } from '../models/integration';
import { NewOrder, Order } from '../models/order';
import { Status } from '../models/status';
import { StatusGroup } from '../models/statusGroup';
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
   if(process.env.NODE_ENV ==='development') await sleep(500);

    return response;
},(error: AxiosError) =>{
    if(!error.response){
        console.log("Connection error");
        return Promise.reject(error);
    }
    const {status} = error.response!;

    switch(status){
        case 400:
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

const Orders = {
    list: (params: URLSearchParams) => axios.get<Order[]>('/orders',{params: params}).then(responseBody),
    details: (id: number) => request.get<Order>(`/orders/${id}`),
    add:(order: NewOrder) => request.post<Order>('/orders',order),
    edit:(order: Order) => request.put<Order>('/orders',order),
    updateStatus:(orderId: number, statusId: number) => request.post('/orders/updateStatus',{orderId: orderId, statusId: statusId}),
}

const Statuses = {
    list: () => request.get<StatusGroup[]>('/statuses'),
    edit: (status: Status) => request.put<Status>('/statuses',status),
    delete: (statusId: number) => request.del(`/statuses/${statusId}`),
    create: (createObject: {groupId:number , status: Status}) => request.post('/statuses',createObject),
    editIndexes: (groupId: number, status1: {id: number, index: number}, status2: {id: number, index: number}) => request.put('/statuses/indexes', {groupId,status1, status2}),
}

const StatusesGroups ={
    create: (name: string) => request.post<StatusGroup>('/statusesgroups',{name: name}),
    edit: (id: number, name: string) => request.put<StatusGroup>('/statusesgroups',{id: id, name: name}),
    delete: (groupId:number) => request.del(`/statusesgroups/${groupId}`),
}

const Integrations={
    list: ()=> request.get<Integration[]>('/integrations'),
    delete: (id: string) => request.del(`/integrations/${id}`),
    create: (newIntegration: NewIntegration) => request.post('/integrations',newIntegration),
}

const agent = {
    Account,
    Orders,
    Statuses,
    StatusesGroups,
    Integrations
}

export default agent;