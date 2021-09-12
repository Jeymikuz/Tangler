import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Icon, Menu, MenuItem } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function DashboardNavbar() {

    const { userStore } = useStore();

    return (
        <>
            <Menu inverted fixed='top' size='large' >
                <Menu.Item position='right'>
                    <Menu.Header>
                        <Dropdown text={userStore.user?.displayName}>
                            <Dropdown.Menu direction='left'>
                                <Dropdown.Item text='Wyloguj' onClick={() => userStore.logout()} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Header>
                </Menu.Item>
            </Menu>
            <Menu inverted vertical attached fixed='left' size='large' >
                <Menu.Item>
                    <Menu.Header style={{ fontSize: 30 }}>Tangler</Menu.Header>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header><Icon name='shopping cart' />Zamówienia</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item as={NavLink} to='/dashboard/zamowienia' name='zamowienia'>Lista zamówień</Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu>
                        <Menu.Item as={NavLink} to='/dashboard/dokumenty' name='dokumenty'>Dokumenty</Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu>
                        <Menu.Item as={NavLink} to='/dashboard/statusy' name='statusy-zamowien'>Statusy Zamówień</Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu>
                        <Menu.Item as={NavLink} to='/dashboard/ustawienia' name='ustawienia'>Ustawienia</Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header><Icon name='clone' />Produkty</Menu.Header>
                </Menu.Item>
            </Menu>
        </>
    )
})