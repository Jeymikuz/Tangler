import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserLoginFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore{
    user: User | null =  null;
    
    constructor(){
        makeAutoObservable(this);
    }

    login = async(creds: UserLoginFormValues) =>{
        try{
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(()=>{
                this.user = user;
            })
            history.push('/');
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