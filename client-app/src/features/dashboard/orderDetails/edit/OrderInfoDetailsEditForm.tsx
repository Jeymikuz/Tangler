import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Divider, Form, Header, Icon, List, Segment } from "semantic-ui-react";
import FTextInput from "../../../../app/common/form/FTextInput";
import { Order } from "../../../../app/models/order";
import { useStore } from "../../../../app/stores/store";

interface Props {
    order: Order;
    changeEditMode: (isEdited: boolean) => void;
}

export default observer(function OrderInfoDetailsEditForm({ order, changeEditMode }: Props) {

    const { ordersStore } = useStore();

    return (
        <Formik
            initialValues={
                order
            }
            onSubmit={(values, { setErrors }) => {
                ordersStore.editOrder(values).then(() => changeEditMode(false))
                    .catch((errors) => setErrors(errors));
            }
            }
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Segment style={{ marginLeft: 50, height: '100%' }} >
                    <Form className='ui form' onSubmit={handleSubmit} >
                        <Header>
                            Informacje
                            <Button type='submit'
                                circular
                                floated='right'
                                icon
                                loading={isSubmitting}
                                style={{ fontSize: '1rem', padding: 10 }}>
                                <Icon name='edit' />
                            </Button>
                        </Header>
                        <List verticalAlign='middle'>
                            <List.Item>
                                <List.Icon name='users' />
                                <List.Content>
                                    Login Klienta: <FTextInput name='clientLogin' placeholder='Login Klienta' />
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='mail' />
                                <List.Content>
                                    Email: <FTextInput name='email' placeholder='Email' />
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='phone' />
                                <List.Content>
                                    Telefon: <FTextInput name='phoneNumber' placeholder='Numer Telefonu' />
                                </List.Content>
                            </List.Item>
                        </List>
                        <Divider />
                        <List verticalAlign='middle'>
                            <List.Item>
                                <List.Icon name='money' />
                                <List.Content>
                                    Cena dostawy: <FTextInput name='deliveryPrice' placeholder='Cena dostawy' /> zł
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='payment' />
                                <List.Content>
                                    Metoda Płatności: <FTextInput name='paymentMethod' placeholder='Metoda Płatności' />
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='truck' />
                                <List.Content>
                                    Metoda Dostawy: <FTextInput name='deliveryMethod' placeholder='Metoda Dostawy' />
                                </List.Content>
                            </List.Item>
                        </List>
                        <Divider />
                        <List verticalAlign='middle'>
                            <List.Item>
                                <List.Icon name='comment alternate outline' />
                                <List.Content>
                                    Wiadomość klienta: <FTextInput name='clientMessage' placeholder='Wiadomość od klienta' />
                                </List.Content>
                            </List.Item>
                        </List>
                    </Form>
                </Segment>
            )}
        </Formik>
    )
})