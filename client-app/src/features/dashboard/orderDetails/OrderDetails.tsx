import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Button, Header, Icon, Label, Segment, Transition } from "semantic-ui-react";
import { number } from "yup/lib/locale";
import { history } from "../../..";
import LoaderComponent from "../../../app/layout/LoaderComponent";
import { useStore } from "../../../app/stores/store";
import OrderInfo from "./OrderInfo";
import OrderProducts from "./OrderProducts";

export default observer(function OrderDetails() {

    const { ordersStore } = useStore();
    const { cleareSelectedOrder, loadOrder, selectedOrder: order, loading } = ordersStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadOrder(parseInt(id));

        return () => {
            cleareSelectedOrder();
        }
    }, [cleareSelectedOrder, loadOrder, ordersStore])

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
                <Label
                    tag
                    style={{ backgroundColor: ordersStore.selectedStatus?.color, color: 'white', marginLeft: '1.3rem' }} >
                    {ordersStore.selectedStatus?.name}
                </Label>
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