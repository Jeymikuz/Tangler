import React from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Container, Dropdown, Menu } from "semantic-ui-react";


export default observer(function HomeNavBar() {
    return (
        <>
            <Menu inverted fixed='top' className='HomeNavBar' >
                <Container>
                    <Menu.Item header as={NavLink} to='/' content='Tangler' className='navbar-header' />
                    <Dropdown text='Funkcje' simple item>
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to='/funkcje/manager-zamowien' >Manager Zamówień</Dropdown.Item>
                            <Dropdown.Item as={NavLink} to='/funkcje/manager-produktow' >Manager Produtków</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item as={NavLink} to='/intergracje' >Integracje</Menu.Item>
                    <Menu.Item as={NavLink} to='/kontakt' >Kontakt</Menu.Item>
                    <Menu.Item as={NavLink} to='/pomoc' >Pomoc</Menu.Item>
                    <Menu.Item position='right' as={NavLink} to='/logowanie' >Zaloguj się</Menu.Item>
                </Container>
            </Menu>
        </>
    )
})