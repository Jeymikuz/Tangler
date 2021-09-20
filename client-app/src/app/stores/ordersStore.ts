import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {Order} from '../models/order';


export default class OrdersStore{
    orderRegistry = new Map<number,Order>();
    selectedOrder: Order | undefined = undefined;
    loading = false;
    statusId = 0;

    constructor(){
        makeAutoObservable(this);
    }

    setStatusId = (id: number) => {
        this.statusId=id;
    }

    loadOrders = async () =>{
        this.setLoading(true);       
        try{
            const params = new URLSearchParams();
            params.append('statusid',this.statusId.toString());

            const result = await agent.Orders.list(params);
            runInAction(()=>{
                result.forEach(order=>{
                    this.orderRegistry.set(order.id,order);
                })
            })
        } catch (error){
            console.log(error);
            this.setLoading(false);
        }
    }

    setLoading = (isLoading: boolean) =>{
        this.loading = isLoading;
    }

    get listOfOrders(){
        return Array.from(this.orderRegistry.values());
    }

    setOrder = (order:Order) =>{
        this.selectedOrder = order;
    }

    private getOrder = (id:number) =>{
        return this.orderRegistry.get(id);
    }
    loadOrder = async (id: number) =>{
        this.setLoading(true);
        let order = this.getOrder(id);
        try{
        if(order){
            this.setOrder(order);
            this.setLoading(false);
           
            return order;
        } else {
            order = await agent.Orders.details(id);
            this.setOrder(order);
            this.setLoading(false);
        }
        } catch(error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    cleareSelectedOrder = () =>{
        this.selectedOrder = undefined;
    }

}