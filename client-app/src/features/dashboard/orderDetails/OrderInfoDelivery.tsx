import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Header, Icon, List } from "semantic-ui-react";
import { Order } from "../../../app/models/order";
import OrderInfoDeliveryEditForm from "./edit/OrderInfoDeliveryEditForm";

interface Props {
    order: Order;
    descriptionStyle?: {};
}

const descriptionStyle = {
    color: '#bfb3b3'
}

export default observer(function OrderInfoDelivery({ order }: Props) {

    const [editMode, setEditMode] = useState(false);

    function changeEditMode(isEdited: boolean) {
        setEditMode(isEdited);
    }

    return (
        <>
            {editMode ? (
                <OrderInfoDeliveryEditForm descriptionStyle={descriptionStyle} changeEditMode={changeEditMode} order={order} />
            ) : (
                <>
                    <Header>
                        Adres Dostawy
                        <Button onClick={() => changeEditMode(true)} circular floated='right' icon style={{ fontSize: '1rem', padding: 10 }}>
                            <Icon name='edit' />
                        </Button>
                    </Header>
                    <List>
                        <List.Item>
                            <List.Description style={descriptionStyle} > Imię i Nazwisko </List.Description>
                            <List.Header>{order.firstName} {order.lastName}</List.Header>
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} > Firma </List.Description>
                            <List.Header>Guardians of the Galaxy</List.Header>
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >Adres</List.Description>
                            {order.deliveryAddress && (
                                <List.Header>{order.deliveryAddress.street}</List.Header>
                            )}
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >Kod Pocztowy</List.Description>
                            {order.deliveryAddress && (
                                <List.Header>{order.deliveryAddress.zipCode}</List.Header>
                            )}
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >Miasto</List.Description>
                            {order.deliveryAddress && (
                                <List.Header>{order.deliveryAddress.city}</List.Header>
                            )}
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >Kraj</List.Description>
                            <List.Header>Polska</List.Header>
                        </List.Item>
                    </List>
                </>
            )}
        </>
    )
})