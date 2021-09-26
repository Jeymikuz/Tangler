import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import {Order} from '../models/order';
import { Status } from "../models/status";


export default class OrdersStore{
    orderRegistry = new Map<number,Order>();
    statuses: Status[] | undefined = undefined;
    selectedStatus: Status | undefined = undefined;
    selectedOrder: Order | undefined = undefined;
    loading = false;
    statusId = 0;
    statusEditModal = false; 

    constructor(){
        makeAutoObservable(this);

        reaction(
            () => this.statusId,
            () => {
                this.loadOrders();
            }
        )
    }

    editStatus = async(status: Status) => {
        this.setLoading(true);
        try{
            let editedStatus = await agent.Statuses.edit(status);
            if(this.statuses){
                var index = this.statuses?.indexOf(status);
                this.statuses[index] = editedStatus;
                this.setStatusId(editedStatus.id);
            }

        } catch(error){

        }
    }

    setEditStatusModal = (isOpen: boolean) =>{
        this.statusEditModal = isOpen;
    }

    loadOrders = async () =>{
        runInAction(()=>{
            this.setLoading(true);       
            this.orderRegistry.clear();
        })
        try{            
            const params = new URLSearchParams();
            params.append('statusid',this.statusId.toString());

            const result = await agent.Orders.list(params);
            runInAction(()=>{
                result.forEach(order=>{
                    this.orderRegistry.set(order.id,order);
                })
                this.setLoading(false);
            })
        } catch (error){
            console.log(error);
            this.setLoading(false);
        }
    }

    setStatusId = (id: number) => {
        runInAction(()=>{
            this.statusId = id;
            this.selectedStatus = this.statuses?.find(x=>x.id == id);
        })
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
            this.setStatusId(parseInt(order.statusId));
            this.setLoading(false);
           
            return order;
        } else {
            order = await agent.Orders.details(id);
            this.setOrder(order);
            if(!this.statuses) await this.loadStatuses();
            this.setStatusId(parseInt(order.statusId));
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

    loadStatuses = async()=>{
        try{
        this.setLoading(true);
        this.statuses = await agent.Statuses.list();


        } catch(error) {
            console.log(error);
            this.setLoading(false);
        }
    }
}