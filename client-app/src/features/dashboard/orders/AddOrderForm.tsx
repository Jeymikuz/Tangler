import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import FTextInput from "../../../app/common/form/FTextInput";
import { Button, Form } from "semantic-ui-react";

export default observer(function AddOrderForm() {

    const { ordersStore } = useStore();
    const validationSchema = Yup.object({
        statusId: Yup.number().required('Musisz wybrać status')
    })

    return (
        <Formik
            initialValues={{ clientLogin: "", firstName: "", lastName: "", phoneNumber: "", email: "", statusId: 0, error: null }}
            validationSchema={validationSchema}
            onSubmit={(values, { setErrors }) => ordersStore.addOrder(values).catch(error => {
                setErrors({ error: 'Problem z dodaniem zamówienia' })
            })}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form' onSubmit={handleSubmit}
                    autoComplete='off'>
                    <Form.Group widths='equal'>
                        <FTextInput label='Login' name='clientLogin' placeholder='Login Klienta' />
                        <FTextInput label='Imię' name='firstName' placeholder='Imię' />
                        <FTextInput label='Nazwisko' name='lastName' placeholder='Nazwisko' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <FTextInput label='Numer telefonu' name='phoneNumber' placeholder='Numer' />
                        <FTextInput label='Email' name='email' placeholder='Email' />
                        <FTextInput label='Status' name='statusId' placeholder='Status' />
                    </Form.Group>
                    <Button loading={isSubmitting} floated='right' positive content='Dodaj' type='submit' />
                    <Button color='black' content='Anuluj' onClick={() => ordersStore.setAddOrderModal(false)} />
                </Form>
            )}
        </Formik>
    )
})