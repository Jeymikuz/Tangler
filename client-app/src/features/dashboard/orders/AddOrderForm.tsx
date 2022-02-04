import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import FTextInput from "../../../app/common/form/FTextInput";
import { Button, DropdownItemProps, Form } from "semantic-ui-react";
import FSelectInput from "../../../app/common/form/FSelectInput";

export default observer(function AddOrderForm() {

    const { ordersStore } = useStore();
    const digitsOnly = (value:any) => /^\d+$/.test(value)
    const validationSchema = Yup.object({
        statusId: Yup.number().required('Musisz wybrać status'),
        email: Yup.string().email("Niepoprawny format"),
        phoneNumber: Yup.string().required('Numer NIP jest wymagany').test('Tylko liczby','Pole powinno zawierać tylko liczby', digitsOnly),
    })
    const statusOptions: DropdownItemProps[] = [];
    ordersStore.statuses?.forEach(x=> statusOptions.push({
        key: x.id,
        value: x.id.toString(),
        text: x.name
    }))
    


    return (
        <Formik
            initialValues={{ clientLogin: "", firstName: "", lastName: "", phoneNumber: "", email: "", statusId: "", error: null }}
            validationSchema={validationSchema}
            onSubmit={(values, { setErrors }) => {
                ordersStore.addOrder(values).catch(error => {
                    setErrors({ error: 'Problem z dodaniem zamówienia' });
                })
            }
                
        }
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
                    <FSelectInput label="Status" name='statusId' placeholder='Wybierz grupę statusów' options={statusOptions} />
                    </Form.Group>
                    <Button loading={isSubmitting} floated='right' positive content='Dodaj' type='submit' />
                    <Button color='black' content='Anuluj' onClick={() => ordersStore.setAddOrderModal(false)} />
                </Form>
            )}
        </Formik>
    )
})