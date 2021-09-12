import { observer } from "mobx-react-lite";
import React from "react";
import { Dropdown, Grid, Menu } from "semantic-ui-react";


export default observer(function Orders() {
    return (
        <Grid >
            <Grid.Row divided >
                <Grid.Column width={2}>
                    <Menu vertical >
                        <Menu.Item>
                            <Menu.Header>Statusy Zamówień</Menu.Header>
                        </Menu.Item>
                        <Menu.Item name='all-orders'>Wszystkie Zamówienia</Menu.Item>
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
                </Grid.Column>
                <Grid.Column stretched width={14}>
                    Orders
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
})