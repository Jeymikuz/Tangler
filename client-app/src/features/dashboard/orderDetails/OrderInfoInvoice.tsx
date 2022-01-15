import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Header, Icon, List } from "semantic-ui-react";
import { Order } from "../../../app/models/order";
import { useStore } from "../../../app/stores/store";
import OrderInfoInvoiceEditForm from "./edit/OrderInfoInvoiceEditForm";

interface Props {
    order: Order;
    descriptionStyle?: {};
}



export default observer(function OrderInfoInvoice({ order, descriptionStyle }: Props) {

    const {ordersStore} = useStore();

    const [editMode, setEditMode] = useState(false);

    function changeEditMode(isEdited: boolean) {
        setEditMode(isEdited);
    }

    return (
        <>
            {editMode ? (
                <OrderInfoInvoiceEditForm
                    order={order}
                    changeEditMode={changeEditMode} descriptionStyle={descriptionStyle} />
            ) : (
                <>
                    <Header>
                        Dane Faktury
                        <Button onClick={() => changeEditMode(true)} circular floated='right' icon style={{ fontSize: '1rem', padding: 10 }}>
                            <Icon name='edit' />
                        </Button>
                    </Header>
                    <List>
                        <List.Item>
                            <List.Description style={descriptionStyle} > Imię i Nazwisko </List.Description>
                            <List.Header>{order.invoice?.firstName} {order.invoice?.lastName}</List.Header>
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} > Firma </List.Description>
                            <List.Header>{order.invoice?.name}</List.Header>
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >Adres</List.Description>
                            {order.deliveryAddress && (
                                <List.Header>{order.invoice?.address?.street}</List.Header>
                            )}
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >Kod Pocztowy</List.Description>
                            {order.deliveryAddress && (
                                <List.Header>{order.invoice?.address!.zipcode}</List.Header>
                            )}
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >Miasto</List.Description>
                            {order.deliveryAddress && (
                                <List.Header>{order.invoice?.address?.city}</List.Header>
                            )}
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >NIP</List.Description>
                            <List.Header>{order.invoice?.nip}</List.Header>
                        </List.Item>
                    </List>
                    {order.invoice?.isCreated ? (
                        <>
                        <Button content='Pobierz fakturę' onClick={()=>{
                            ordersStore.getInvoice(order.id.toString());
                        }} />
                        </>
                    ): (
                        <>
                        <Button content='Utwórz fakturę' />
                        </>
                    )}
                </>
            )}
        </>
    )
})