import { observer } from "mobx-react-lite";
import React, {  useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Dropdown, Header, Icon, Label, Segment } from "semantic-ui-react";
import { history } from "../../..";
import { Status } from "../../../app/models/status";
import { useStore } from "../../../app/stores/store";
import OrderInfo from "./OrderInfo";
import OrderProducts from "./OrderProducts";

export default observer(function OrderDetails() {

    const { ordersStore } = useStore();
    const { cleareSelectedOrder, loadOrder, selectedOrder: order, loading, loadOrderStatus } = ordersStore;
    const { id } = useParams<{ id: string }>();

    const [showEditStatus, setShowEditStatus] = useState(false);    

    const countryOptions: any[] = []

    const [status,setStatus] = useState<Status>({
        id: -1,
        color: '#FFFFFF',
        index: -1,
        name: 'None'
    });

      ordersStore.statuses?.forEach(x=> countryOptions.push({
          key: x.id,
          value: x.id,
          text: x.name,
      }))

      function updateStatus (statusId: number){
            const findedStatus = ordersStore.statuses?.find(x=>x.id === statusId);
            setStatus(findedStatus!);
            console.log(status.name)
      }

    useEffect(() => {
        async function loadOrderAndStatus(){
        const founderOrder = await loadOrder(parseInt(id));
        if(founderOrder){
            var status = loadOrderStatus(parseInt(founderOrder.statusId!));
            setStatus(status!);
        }}

        loadOrderAndStatus();
    
        return () => {
            cleareSelectedOrder();
        }
    }, [loadOrder, cleareSelectedOrder, id, loadOrderStatus])

    function returnToList() {
        history.goBack();
    }

    if (loading || !order) return (null);

    return (
        <>
            <Button
                onClick={returnToList}
                color='yellow'
                style={{ margin: 50, marginBottom: 5 }}>
                <Icon name='reply' />
                Cofnij
            </Button>

            <Header
                style={{ margin: 50, marginBottom: 5, marginTop: 35 }}>
                Zamówienie {order.id}
                {showEditStatus ? 
                (<Dropdown 
                    placeholder='Wybierz status' 
                    options={countryOptions} 
                    inline
                    selection
                    onChange={(e: any,{name,value}: any)=>{
                        console.log('Name '+ name+ " Value: "+ value);
                        ordersStore.updateOrderStatus(order.id, value).then(() => setShowEditStatus(false));
                        updateStatus(value);
                    }}
                    style={{marginLeft: '2rem', }}
                    />) : (
                        <>
                        {status && 
                        <Label
                        tag
                        onClick={()=>setShowEditStatus(true)}
                        style={{ backgroundColor: status.color, color: 'white', marginLeft: '1.3rem' }} >
                        {status.name}
                 </Label>    
                        }
                        </>
                      
                )}
                <Header.Subheader>
                    {order.orderedAt}
                </Header.Subheader>
            </Header>
            <Segment style={{ margin: 50, marginTop: 10 }} >
                <OrderProducts order={order} />
            </Segment>
            <OrderInfo order={order} />
        </>
    )
})