import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from "react-router-dom";
import { Label, Tab, Table } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function OrdersList() {

    const { ordersStore } = useStore();

    return (
        <>
            <Table celled striped style={{ margin: 10 }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>Zamówienia</Table.HeaderCell>
                    </Table.Row>

                </Table.Header>
                <Table.Body>
                    {ordersStore.listOfOrders.map(order => (
                        <Table.Row>
                            <Table.Cell collapsing>
                                <NavLink to={`/dashboard/zamowienia/${order.id}`}>Id: {order.id} </NavLink>
                            </Table.Cell>
                            <Table.Cell collapsing>
                                {order.firstName} {order.lastName}
                            </Table.Cell>
                            <Table.Cell>
                                {order.products.map(product => (
                                    <>
                                        {product.name} <Label tag> x {product.quantity} </Label>
                                    </>
                                ))}
                            </Table.Cell>
                            <Table.Cell collapsing>
                                {order.deliveryMethod}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
})