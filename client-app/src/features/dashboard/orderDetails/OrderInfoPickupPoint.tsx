import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Header, Icon, List } from "semantic-ui-react";
import { Order } from "../../../app/models/order";
import OrderInfoPickupPointEditForm from "./edit/OrderInfoPickupPointEditForm";

interface Props {
    order: Order;
    descriptionStyle?: {},
}

const descriptionStyle = {
    color: '#bfb3b3'
}

export default observer(function OrderInfoPickupPoint({ order }: Props) {

    const [editMode, setEditMode] = useState(false);

    function changeEditMode(isEdited: boolean) {
        setEditMode(isEdited);
    }

    return (
        <>
            {editMode ? (
                <OrderInfoPickupPointEditForm changeEditMode={changeEditMode} order={order} descriptionStyle={descriptionStyle} />
            ) : (
                <>
                    <Header>
                        Odbiór w Punkcie
                        <Button onClick={() => changeEditMode(true)} circular floated='right' icon style={{ fontSize: '1rem', padding: 10 }}>
                            <Icon name='edit' />
                        </Button>
                    </Header>
                    <List>
                        <List.Item>
                            <List.Description style={descriptionStyle} > Nazwa </List.Description>
                            <List.Header>{order.pickUpPoint?.name}</List.Header>
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} > ID </List.Description>
                            <List.Header>{order.pickUpPoint?.pointId}</List.Header>
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} > Adres </List.Description>
                            <List.Header>{order.pickUpPoint?.address?.street}</List.Header>
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >Kod pocztowy</List.Description>
                            <List.Header>{order.pickUpPoint?.address?.zipCode}</List.Header>
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >Miasto</List.Description>
                            <List.Header>{order.pickUpPoint?.address?.city}</List.Header>
                        </List.Item>
                    </List>
                </>
            )}
        </>
    )
})