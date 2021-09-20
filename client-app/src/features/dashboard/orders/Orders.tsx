import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Dropdown, Grid, Label, Menu } from "semantic-ui-react";
import LoaderComponent from "../../../app/layout/LoaderComponent";
import { useStore } from "../../../app/stores/store";
import OrdersList from "./OrdersList";


export default observer(function Orders() {

    const { ordersStore } = useStore();

    useEffect(() => {
        ordersStore.loadOrders();
    }, [ordersStore])

    return (
        <div className='container__dashboard'>
            <div className='container__sidebar' style={{ width: '15rem' }} >
                <Menu vertical className='statuses__menu' >
                    <Menu.Item>
                        <Button content='Dodaj zamówienie' icon='plus' circular compact color='yellow' />
                    </Menu.Item>
                    <Menu.Item>
                        <Menu.Header>Statusy Zamówień</Menu.Header>
                    </Menu.Item>
                    <Menu.Item name='all-orders' ><Label color='teal'>{ordersStore.listOfOrders.length}</Label>Wszystkie Zamówienia  </Menu.Item>
                    <Menu.Item>
                        <Dropdown compact text='Nowe' wrapSelection>
                            <Dropdown.Menu>
                                <Dropdown.Item>Zamowienia sklep</Dropdown.Item>
                                <Dropdown.Item>Zamowienia allegro</Dropdown.Item>
                                <Dropdown.Item>Zamowienia ebay</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Menu>
            </div>
            <div className='container__main' style={{ paddingRight: 20 }}>
                <OrdersList />
            </div>
        </div>
    )
})