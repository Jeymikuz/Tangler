import React from "react";
import { observer } from "mobx-react-lite";
import { Order } from "../../../app/models/order";
import { Button, Divider, Grid, GridColumn, Header, Icon, Item, List, Segment } from "semantic-ui-react";

interface Props {
    order: Order;
}

const descriptionStyle = {
    color: '#bfb3b3'
}

export default observer(function OrderInfo({ order }: Props) {
    return (
        <>
            <Grid>
                <Grid.Row columns={2} >
                    <Grid.Column>
                        <Segment style={{ marginLeft: 50, height: '100%' }} >
                            <Header>
                                Informacje
                                <Button circular floated='right' icon style={{ fontSize: '1rem', padding: 10 }}>
                                    <Icon name='edit' />
                                </Button>
                            </Header>
                            <List verticalAlign='middle'>
                                <List.Item>
                                    <List.Icon name='users' />
                                    <List.Content>
                                        Login Klienta: {order.clientLogin}
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='mail' />
                                    <List.Content>
                                        Email: {order.email}
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='phone' />
                                    <List.Content>
                                        Telefon: {order.phoneNumber}
                                    </List.Content>
                                </List.Item>
                            </List>
                            <Divider />
                            <List verticalAlign='middle'>
                                <List.Item>
                                    <List.Icon name='payment' />
                                    <List.Content>
                                        Metoda Płatności: {order.paymentMethod}
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='truck' />
                                    <List.Content>
                                        Metoda Dostawy: {order.deliveryMethod}
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment style={{ marginRight: 50, height: '100%' }} >
                            <Grid>
                                <Grid.Row divided columns={3}>
                                    <Grid.Column>
                                        <Header>
                                            Adres Dostawy
                                            <Button circular floated='right' icon style={{ fontSize: '1rem', padding: 10 }}>
                                                <Icon name='edit' />
                                            </Button>
                                        </Header>
                                        <List>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} > Imię i Nazwisko </List.Description>
                                                <List.Header>{order.firstName} {order.lastName}</List.Header>
                                            </List.Item>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} > Firma </List.Description>
                                                <List.Header>Guardians of the Galaxy</List.Header>
                                            </List.Item>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} >Adres</List.Description>
                                                <List.Header>{order.deliveryAddress.street}</List.Header>
                                            </List.Item>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} >Kod Pocztowy</List.Description>
                                                <List.Header>{order.deliveryAddress.zipcode}</List.Header>
                                            </List.Item>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} >Miasto</List.Description>
                                                <List.Header>{order.deliveryAddress.city}</List.Header>
                                            </List.Item>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} >Kraj</List.Description>
                                                <List.Header>Polska</List.Header>
                                            </List.Item>
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Header>
                                            Dane Faktury
                                            <Button circular floated='right' icon style={{ fontSize: '1rem', padding: 10 }}>
                                                <Icon name='edit' />
                                            </Button>
                                        </Header>
                                        <List>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} > Imię i Nazwisko </List.Description>
                                                <List.Header>{order.firstName} {order.lastName}</List.Header>
                                            </List.Item>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} > Firma </List.Description>
                                                <List.Header>Guardians of the Galaxy</List.Header>
                                            </List.Item>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} >Adres</List.Description>
                                                <List.Header>{order.deliveryAddress.street}</List.Header>
                                            </List.Item>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} >Kod Pocztowy</List.Description>
                                                <List.Header>{order.deliveryAddress.zipcode}</List.Header>
                                            </List.Item>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} >Miasto</List.Description>
                                                <List.Header>{order.deliveryAddress.city}</List.Header>
                                            </List.Item>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} >NIP</List.Description>
                                                <List.Header>997</List.Header>
                                            </List.Item>
                                        </List>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Header>
                                            Odbiór w Punkcie
                                            <Button circular floated='right' icon style={{ fontSize: '1rem', padding: 10 }}>
                                                <Icon name='edit' />
                                            </Button>
                                        </Header>
                                        <List>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} > Nazwa </List.Description>
                                                <List.Header></List.Header>
                                            </List.Item>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} > Adres </List.Description>
                                                <List.Header></List.Header>
                                            </List.Item>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} >Kod pocztowy</List.Description>
                                                <List.Header></List.Header>
                                            </List.Item>
                                            <List.Item>
                                                <List.Description style={descriptionStyle} >Miasto</List.Description>
                                                <List.Header></List.Header>
                                            </List.Item>
                                        </List>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Segment>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </>
    )
})