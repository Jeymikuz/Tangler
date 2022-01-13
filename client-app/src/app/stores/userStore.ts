import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { NewUser, User, UserLoginFormValues } from "../models/user";
import { store } from "./store";


export default class UserStore{
    
    user: User | null =  null;
    
    constructor(){
        makeAutoObservable(this);
    }
    
    get isLoggedIn(){
        return !!this.user;
    }

    loadUsers = async() =>{
        try{
            return await agent.Account.getUserList();
        }catch(error){
            console.log(error);
        }
    }
    
    createUser = async(newUser: NewUser) => {
        try{
            await agent.Account.createUser(newUser);
        }catch(error){
            console.log(error);
        }
    }

    deleteUser =  async (userName: string) =>{
        try{
            await agent.Account.deleteUser(userName);
        }catch(error){
            console.log(error);
        }
    }

    logout = () =>{
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    login = async(creds: UserLoginFormValues) =>{
        try{
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(()=>{
                this.user = user;
            })
            history.push('/dashboard');
        } catch(error){
           throw error;
        }
    }

    getCurrentUser = async() =>{
        try{
            const user = await agent.Account.current();
            runInAction(()=>{
                this.user = user;
            })
        } catch(error){
            throw error;
        }
    }
}
function parseJwt (token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};