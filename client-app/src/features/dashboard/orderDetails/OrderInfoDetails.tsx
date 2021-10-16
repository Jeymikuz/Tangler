import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Divider, Header, Icon, List, Segment } from "semantic-ui-react";
import { Order } from "../../../app/models/order";
import OrderInfoDetailsEditForm from "./edit/OrderInfoDetailsEditForm";

interface Props {
    order: Order;
    descriptionStyle?: {};
}

export default observer(function OrderInfoDetails({ order }: Props) {

    const [editMode, setEditMode] = useState(false);

    function changeEditMode(isEdited: boolean) {
        setEditMode(isEdited);
    }

    return (
        <>
            {editMode ? (
                <OrderInfoDetailsEditForm order={order} changeEditMode={changeEditMode} />
            ) : (
                <Segment style={{ marginLeft: 50, height: '100%' }} >
                    <Header>
                        Informacje
                        <Button onClick={() => changeEditMode(true)} circular floated='right' icon style={{ fontSize: '1rem', padding: 10 }}>
                            <Icon name='edit' />
                        </Button>
                    </Header>
                    <List verticalAlign='middle'>
                        <List.Item>
                            <List.Icon name='users' />
                            <List.Content>
                                Login Klienta: {order.clientLogin}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='mail' />
                            <List.Content>
                                Email: {order.email}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='phone' />
                            <List.Content>
                                Telefon: {order.phoneNumber}
                            </List.Content>
                        </List.Item>
                    </List>
                    <Divider />
                    <List verticalAlign='middle'>
                        <List.Item>
                            <List.Icon name='money' />
                            <List.Content>
                                Cena dostawy: {order.deliveryPrice} zł
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='payment' />
                            <List.Content>
                                Metoda Płatności: {order.paymentMethod}
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='truck' />
                            <List.Content>
                                Metoda Dostawy: {order.deliveryMethod}
                            </List.Content>
                        </List.Item>
                    </List>
                    <Divider />
                    <List verticalAlign='middle'>
                        <List.Item>
                            <List.Icon name='comment alternate outline' />
                            <List.Content>
                                Wiadomość klienta: {order.clientMessage}
                            </List.Content>
                        </List.Item>
                    </List>
                </Segment>
            )}
        </>
    )
})