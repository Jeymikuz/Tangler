import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form, Header, Icon, List } from "semantic-ui-react";
import FTextInput from "../../../../app/common/form/FTextInput";
import { Order } from "../../../../app/models/order";
import { useStore } from "../../../../app/stores/store";

interface Props {
    order: Order;
    changeEditMode: (isEdited: boolean) => void;
    descriptionStyle: {} | undefined,
}

export default observer(function OrderInfoPickupPointEditForm({ order, changeEditMode, descriptionStyle }: Props) {

    const { ordersStore } = useStore();

    return (
        <Formik
            initialValues={order}
            onSubmit={(values, { setErrors }) => {
                ordersStore.editOrder(values).then(() => changeEditMode(false)).catch((errors) => setErrors(errors));
            }}
        >
            {({ isSubmitting, handleSubmit }) => (
                <Form className='ui form' onSubmit={handleSubmit} >
                    <Header>
                        Odbiór w Punkcie
                        <Button type='submit' loading={isSubmitting} circular floated='right' icon style={{ fontSize: '1rem', padding: 10 }}>
                            <Icon name='edit' />
                        </Button>
                    </Header>
                    <List>
                        <List.Item>
                            <List.Description style={descriptionStyle} > Nazwa </List.Description>
                            <FTextInput name='pickup.name' placeholder='Nazwa Punktu' />
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} > ID </List.Description>
                            <FTextInput name='pickup.id' placeholder='ID Punktu' />
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} > Adres </List.Description>
                            <FTextInput name='pickup.address' placeholder='Adres' />
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >Kod pocztowy</List.Description>
                            <FTextInput name='pickup.zipcode' placeholder='Kod pocztowy' />
                        </List.Item>
                        <List.Item>
                            <List.Description style={descriptionStyle} >Miasto</List.Description>
                            <FTextInput name='pickup.city' placeholder='Miasto' />
                        </List.Item>
                    </List>
                </Form>
            )}
        </Formik>
    )
})