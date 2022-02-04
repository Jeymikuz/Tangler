import React from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

export default observer(function DashboardSidebar() {


    return (
        <div className='container__sidebar'>
            <Menu className='sidebar__stick' inverted vertical size='large' style={{ borderRadius: '0px', height: '100%' }}>
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
                        <Menu.Item as={NavLink} to='/dashboard/integracje' name='ustawienia'>Integracje</Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu>
                        <Menu.Item as={NavLink} to='/dashboard/ustawienia' name='ustawienia'>Ustawienia</Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                {/* <Menu.Item>
                    <Menu.Header><Icon name='clone' />Produkty</Menu.Header>
                </Menu.Item> */}
            </Menu>
        </div>
    )
})