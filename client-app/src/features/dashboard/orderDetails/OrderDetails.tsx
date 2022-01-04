import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Dropdown, Header, Icon, Label, Segment } from "semantic-ui-react";
import { history } from "../../..";
import { useStore } from "../../../app/stores/store";
import OrderInfo from "./OrderInfo";
import OrderProducts from "./OrderProducts";

export default observer(function OrderDetails() {

    const { ordersStore } = useStore();
    const { cleareSelectedOrder, loadOrder, selectedOrder: order, loading } = ordersStore;
    const { id } = useParams<{ id: string }>();

    const [showEditStatus, setShowEditStatus] = useState(false);    

    const countryOptions: any[] = []

      ordersStore.statuses?.forEach(x=> countryOptions.push({
          key: x.id,
          value: x.id,
          text: x.name
      }))

    useEffect(() => {
        if (id) loadOrder(parseInt(id));

        return () => {
            cleareSelectedOrder();
        }
    }, [cleareSelectedOrder, loadOrder, ordersStore, id])

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
                    selection
                    onChange={(e: any,{name,value}: any)=>{
                        console.log('Name '+ name+' '+ "Value: "+ value);
                        ordersStore.updateOrderStatus(order.id, value).then(() => setShowEditStatus(false));
                    }}
                    />) : (
                      <Label
                            tag
                            onClick={()=>setShowEditStatus(true)}
                            style={{ backgroundColor: ordersStore.selectedStatus?.color, color: 'white', marginLeft: '1.3rem' }} >
                            {ordersStore.selectedStatus?.name}
                     </Label>    
                )}
                <Header.Subheader>
                    10.10.2021 15:45
                </Header.Subheader>
            </Header>
            <Segment style={{ margin: 50, marginTop: 10 }} >
                <OrderProducts order={order} />
            </Segment>
            <OrderInfo order={order} />
        </>
    )
})