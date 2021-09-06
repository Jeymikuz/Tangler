import { makeAutoObservable, runInAction } from "mobx";
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
        } catch(error){
            console.log(error);
        }
    }
}