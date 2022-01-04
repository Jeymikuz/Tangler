import React from "react";
import { observer } from "mobx-react-lite";
import { Dropdown, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function DashboardNavbar() {
    const { userStore,ordersStore } = useStore();

    return (
        <Menu className='dashboard__navbar' fixed='top' inverted size='large' style={{ borderRadius: '0px', margin: 0}}>
            <Menu.Item position='right'>
                <Menu.Header>
                    <Dropdown text={userStore.user?.displayName}>
                        <Dropdown.Menu direction='left'>
                            <Dropdown.Item text='Wyloguj' onClick={() => {
                                userStore.logout()
                                ordersStore.reset();
                            }} />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Header>
            </Menu.Item>
        </Menu>
    )
})