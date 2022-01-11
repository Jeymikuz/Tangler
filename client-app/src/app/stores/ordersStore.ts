import { makeAutoObservable, reaction, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { Integration, NewIntegration } from "../models/integration";
import {NewOrder, Order} from '../models/order';
import { OrderProduct } from "../models/orderProduct";
import { Status } from "../models/status";
import { StatusGroup } from "../models/statusGroup";


export default class OrdersStore{
    orderRegistry = new Map<number,Order>();
    statuses: Status[] | undefined = undefined;
    statusGroups: StatusGroup[] | undefined = undefined;
    selectedStatus: Status | undefined = undefined;
    selectedOrder: Order | undefined = undefined;
    integrations: Integration[] | undefined = undefined;
    loading = false;
    statusId = 0;
    statusEditModal = false; 
    addOrderModal = false;

    constructor(){
        makeAutoObservable(this);

        reaction(
            () => this.statusId,
            () => {
                this.loadOrders();
            }
        )
    }

    createIntegration = async(newIntegration: NewIntegration) => {
        try{
            await agent.Integrations.create(newIntegration);
        }catch(error){

        }
    }

    deleteIntegrations = async(id: string) => {
        try{
            await agent.Integrations.delete(id);
        } catch(error){
            console.log(error);
        }
    }

    loadIntegrations = async() =>{
        try{
            this.integrations = await agent.Integrations.list();
        }catch(error){
            console.log(error);
        }
    }

    updateOrderStatus = async(orderId: number, statusId: number) =>{
        try{
            await agent.Orders.updateStatus(orderId,statusId);
            runInAction(()=>{
                this.selectedOrder!.statusId=statusId.toString();
            })
        }catch(error){
            
        }
    }

    updateStatusesIndexes = async(
        groupId: number, 
        status1: {id: number, index: number}, 
        status2: {id: number, index: number}) =>{
            try{
                console.log("Updatowanie statusów")
                await agent.Statuses.editIndexes(groupId,status1,status2);
            }catch(error){
                console.log(error);
            }
    }    

    editGroupStatus = async(statusGroup: StatusGroup)=>{
        try{
            var editedGroup = await agent.StatusesGroups.edit(statusGroup.id, statusGroup.name);
            var index = this.statusGroups?.findIndex(x=> x.id === statusGroup.id);
            runInAction(() => {
                console.log(this.statusGroups);
                console.log('LELELE')
                console.log('index ' + index)
                console.log(editedGroup)
                this.statusGroups![index!] = editedGroup;
                console.log(this.statusGroups);
            })

        }catch(error){
            console.log(error);
        }
    }

    createGroupsStatus = async(name: string) => {
        try{
            console.log(name)
            var newGroup = await agent.StatusesGroups.create(name);
            
            runInAction(()=>{
                this.statusGroups?.push(newGroup);
            })
        }catch(error){
            console.log(error);
        }
    }

    createStatus = async(groupId: number, status: Status)=>{
        try{
            await agent.Statuses.create({groupId: groupId, status: status});
            await this.loadStatuses();
        } catch(error){
            console.log(error);
        }
    }

    deleteStatusGroup = async(groupId: number) => {
        try{ 
            console.log(`Usuwam grupe ${groupId}`)
            await agent.StatusesGroups.delete(groupId);
            await this.loadStatuses();
        } catch(error: any){
            if(error.response){
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.header);
            }
        }
    }

    updateStatusOrder = (id: number, indexStart: number, indexEnd: number ) =>{
        if(indexStart !== indexEnd){

            const items = Array.from(this.statusGroups?.find(x=>x.id === id)?.statuses!);
            const [reorderedItems] = items.splice(indexStart,1);
            items.splice(indexEnd,0,reorderedItems);
            
            const status1 = this.statusGroups?.find(x=>x.id === id)?.statuses?.find(x=>x.index === indexStart);
            const status2 = this.statusGroups?.find(x=>x.id === id)?.statuses?.find(x=>x.index === indexEnd);
            
            this.updateStatusesIndexes(id,{id: status1?.id!, index: status2?.index!},{id: status2?.id!, index: status1?.index!});

            runInAction(()=>{
              //  this.statusGroups!.find(x=>x.id === id)!.statuses!.find(x=>x.index === indexStart)!.index = indexEnd
              //  this.statusGroups!.find(x=>x.id === id)!.statuses!.find(x=>x.index === indexEnd)!.index = indexStart;
              var temp = 0;
              items.map((s) => s.index = temp++ );
              this.statusGroups!.find(x=>x.id === id)!.statuses = items;
            })
        }
    }

    reset = () =>{
        runInAction(()=>{
            this.statuses = undefined;
            this.orderRegistry.clear();
            this.selectedStatus = undefined;
            this.selectedOrder = undefined;
            this.loading = false;
            this.statusId = 0;
            this.statusEditModal = false; 
            this.addOrderModal = false;
        })
    }

    addNewProductToOrder = async () =>{
     const newProduct: OrderProduct = {
         id: 0,
         externalId: 0,
         warehouseId: 0,
         description: '',
         ean: '',
         sku: '',
         img: '',
         name: '',
         price: 0,
         quantity: '',
         weight: 0
     };
     
     try{
         runInAction(()=>{
             this.selectedOrder?.products?.push(newProduct);
            })
            
            const result = await agent.Orders.edit(this.selectedOrder!);
            runInAction(()=>{
                this.orderRegistry.set(result.id,result);
                this.selectedOrder = result;
            })
        }
        catch (error){
            console.log(error);
        }

    }

    editProductOrder = async (product: OrderProduct) =>{
        try{
            var index = this.selectedOrder?.products?.findIndex(x=>x.id === product.id);
            this.selectedOrder!.products![index!] = product;
            const result = await agent.Orders.edit(this.selectedOrder!);
            runInAction(()=>{
                this.orderRegistry.set(result.id,result);
                this.selectedOrder = result;
            })
            
        } catch(error){
            console.log(error);
        }
    }

    editOrder = async (order: Order)=>{
        try{
            const result = await agent.Orders.edit(order);
            runInAction(()=>{
                this.orderRegistry.set(result.id,result);
                this.selectedOrder = result;
            })
            
        } catch(error){
            console.log(error);
        }
    }

    addOrder = async (order: NewOrder) =>{
        try{
            this.setLoading(true);
            const result = await agent.Orders.add(order);
            runInAction(()=>{
                this.orderRegistry.set(result.id,result);
                this.selectedOrder = result;
                history.push(`/dashboard/zamowienia/${result.id}`);
                this.setLoading(false);
            })
        } catch(error) {
            this.setLoading(false);
            console.log(error);
        }
    }

    setAddOrderModal = (isOpen: boolean) => {
        this.addOrderModal = isOpen;
    }   

    deleteStatus = async(statusId: number) =>{
        try{
            await agent.Statuses.delete(statusId).then(()=>{
                runInAction(()=>{
                var statusGroupId = this.statusGroups!.find(x=>x.statuses!.find(x=>x.index! === statusId!));
                var indexOfStatusGroup = this.statusGroups!.indexOf(statusGroupId!);
                var statusToRemove = this.statusGroups![indexOfStatusGroup].statuses?.find(x=>x.id === statusId);
                var indexOfStatus = this.statusGroups![indexOfStatusGroup].statuses?.indexOf(statusToRemove!);
                    this.statusGroups![indexOfStatusGroup].statuses!.slice(indexOfStatus,1);
                })
            });

            await this.loadStatuses();
        } catch(errors){
            console.log(errors);
        }
    }

    editStatus = async(status: Status) => {
        this.setLoading(true);
        try{
            let editedStatus = await agent.Statuses.edit(status);
            console.log(editedStatus);
            if(this.statusGroups){
                runInAction(()=>{
                    if(this.statusGroups){
                        var statusGroupId = this.statusGroups!.find(x=>x.statuses!.find(x=>x.index! === editedStatus.id!));
                        var indexOfStatusGroup = this.statusGroups.indexOf(statusGroupId!);
                        var statusToEdit = this.statusGroups[indexOfStatusGroup].statuses?.find(x=>x.id === editedStatus.id);
                        var indexOfStatus = this.statusGroups[indexOfStatusGroup].statuses?.indexOf(statusToEdit!);

                        this.statusGroups[indexOfStatusGroup].statuses![indexOfStatus!] = editedStatus;
                        var index = this.statuses?.indexOf(this.selectedStatus!); 
                        this.statuses![index!] = editedStatus;
                        this.setStatusId(editedStatus.id);
                        this.selectedStatus = editedStatus;
                    }
                })            
            }
        } catch(error){
            console.log(error);
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
                result.forEach((order: Order)=>{
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
            this.selectedStatus = this.statuses?.find(x=>x.id === id);
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

    loadOrderStatus = (statusId: number) =>{
        const findedStatus = this.statuses?.find(x=>x.id === statusId);
        return findedStatus;
    }

    loadOrder = async (id: number) =>{
        this.setLoading(true);
        let order = this.getOrder(id);
        try{
        if(order){
            this.setOrder(order);
       //     this.setStatusId(parseInt(order.statusId!));
            this.setLoading(false);
           
            return order;
        } else {
            order = await agent.Orders.details(id);
            this.setOrder(order!);
            if(!this.statuses) await this.loadStatuses();
            this.setStatusId(parseInt(order!.statusId!));
            this.setLoading(false);
            return order;
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
        
         const statusGroups= await agent.Statuses.list();
         runInAction(()=>{

             this.statusGroups = statusGroups;
             this.statuses = [];
            // eslint-disable-next-line array-callback-return
            this.statusGroups!.map(x=>x.statuses?.map(status => {
                this.statuses?.push(status);
            }
        )
        )});
            
        } catch(error) {
            console.log(error);
            this.setLoading(false);
        }
    }
}