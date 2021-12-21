import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Header, Label, Table } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import StatusModal from "../statuses/StatusModal";
import OrderListPlaceholder from "./OrderListPlaceholder";

export default observer(function OrdersList() {

    const { ordersStore } = useStore();

    useEffect(() => {
        ordersStore.loadOrders();
    }, [ordersStore])

    return (
        <>
            <Header>
                {ordersStore.selectedStatus?.id === 0 || !ordersStore.selectedStatus ? (
                    <Label style={{ backgroundColor: '#fbbd08', color: 'white' }} >Wszystkie Zamówienia</Label>
                ) : (
                    <StatusModal 
                    status={ordersStore.selectedStatus}
                    component={<Label style={{ backgroundColor: ordersStore.selectedStatus?.color, color: 'white' }} >{ordersStore.selectedStatus?.name}</Label>} />

                )}
            </Header>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width='1'>Id</Table.HeaderCell>
                        <Table.HeaderCell width='2'>Imię i Nazwisko</Table.HeaderCell>
                        <Table.HeaderCell width='11' >Produkty</Table.HeaderCell>
                        <Table.HeaderCell width='1'>Dostawa</Table.HeaderCell>
                        <Table.HeaderCell width='2'>Informacje</Table.HeaderCell>
                    </Table.Row>

                </Table.Header>
                {ordersStore.loading ? (
                    <OrderListPlaceholder />
                ) :
                    <Table.Body>
                        {ordersStore.listOfOrders.map(order => (
                            <Table.Row key={order.id} >
                                <Table.Cell collapsing>
                                    <NavLink to={`/dashboard/zamowienia/${order.id}`}>{order.id} </NavLink>
                                </Table.Cell>
                                <Table.Cell collapsing>
                                    {order.firstName} {order.lastName}
                                </Table.Cell>
                                <Table.Cell>
                                    {order.products && order.products.map(product => (
                                        <div key={product.id} >
                                            {product.name} <Label tag> x {product.quantity} </Label>
                                        </div>
                                    ))}
                                </Table.Cell>
                                <Table.Cell collapsing>
                                    {order.deliveryMethod}
                                    <Label>
                                        {order.deliveryPrice}                                      
                                    </Label>
                                </Table.Cell>
                                <Table.Cell collapsing>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                }
            </Table>
        </>
    )
})