import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Label, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import AddOrderModal from "./AddOrderModal";
import OrdersList from "./OrdersList";


export default observer(function Orders() {

    const { ordersStore } = useStore();
    const { statuses, setStatusId } = ordersStore;

    useEffect(() => {
        if (!statuses) ordersStore.loadStatuses();
    }, [statuses, ordersStore])

    return (
        <div className='container__dashboard'>
            <div className='container__sidebar' style={{ width: '15rem' }} >
                <AddOrderModal />
                <Menu vertical className='statuses__menu' >
                    <Menu.Item>
                        <Button content='Dodaj zamówienie' icon='plus' circular compact color='yellow'
                            onClick={() => ordersStore.setAddOrderModal(true)}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Menu.Header>Statusy Zamówień</Menu.Header>
                    </Menu.Item>
                    <Menu.Item name='all-orders' onClick={() => setStatusId(0)}>Wszystkie Zamówienia</Menu.Item>
                    {statuses && statuses.map(status => (
                        <Menu.Item
                            onClick={() => setStatusId(status.id)}
                            key={status.id}>
                            <Label
                                style={{ backgroundColor: status.color }}
                                content='12' />
                            {status.name}
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
            <div className='container__main' style={{ paddingRight: 20 }}>
                <OrdersList />
            </div>
        </div >
    )
})