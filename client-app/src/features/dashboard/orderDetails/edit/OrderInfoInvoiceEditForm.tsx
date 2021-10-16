import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form, Header, Icon, List } from "semantic-ui-react";
import FTextInput from "../../../../app/common/form/FTextInput";
import { Order } from "../../../../app/models/order";
import { useStore } from "../../../../app/stores/store";

interface Props {
    order: Order,
    changeEditMode: (isEdited: boolean) => void;
    descriptionStyle: {} | undefined,
}

export default observer(function OrderInfoInvoiceEditForm({ order, changeEditMode, descriptionStyle }: Props) {

    const { ordersStore } = useStore();

    return (
        <Formik
            initialValues={order}
            onSubmit={(values, { setErrors }) => {
                ordersStore.editOrder(values).then(() => changeEditMode(false)).catch(
                    (erros) => setErrors(erros));
            }}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form' onSubmit={handleSubmit} >
                    <Header>
                        Dane Faktury
                        <Button type='submit' loading={isSubmitting} circular floated='right' icon style={{ fontSize: '1rem', padding: 10 }}>
                            <Icon name='edit' />
                        </Button>
                    </Header>
                    <List>
                        <List.Item>
                            <List.Description style={descriptionStyle} > Imię i Nazwisko </List.Description>
                            <Form.Group widths={2}>
                                <FTextInput name='firstName' placeholder='Imię' />
                                <FTextInput name='lastName' placeholder='Nazwisko' />
                            </Form.Group>
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} > Firma </List.Description>
                            <FTextInput name='companyName' placeholder='Nazwa Firmy' />
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >Adres</List.Description>
                            <FTextInput name='deliveryAddress.street' placeholder='Ulica' />
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >Kod Pocztowy</List.Description>
                            <FTextInput name='deliveryAddress.zipcode' placeholder='Kod Pocztowy' />
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >Miasto</List.Description>
                            <FTextInput name='deliveryAddress.city' placeholder='Miasto' />
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >NIP</List.Description>
                            <FTextInput name='invoice.nipNumber' placeholder='NIP' />
                        </List.Item>
                    </List>
                </Form>
            )}
        </Formik >
    )
})