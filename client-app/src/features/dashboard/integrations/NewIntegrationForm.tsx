import React from 'react';
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, DropdownItemProps, Header } from "semantic-ui-react";
import FSelectInput from "../../../app/common/form/FSelectInput";
import FTextInput from "../../../app/common/form/FTextInput";
import { IntegrationType, NewIntegration } from "../../../app/models/integration";
import { useStore } from "../../../app/stores/store";

interface Props{
    setOpen: (isOpen: boolean) => void;
}

export default observer(function NewIntegrationForm({setOpen}:Props){

    const {ordersStore} = useStore();

    const groupsOptions: DropdownItemProps[] = [{
        key: 0,
        value: 0,
        text: 'Woocommerce'
    }];


    const newIntegration: NewIntegration = {
        client_key: '',
        privateName: '',
        private_key: '',
        siteUrl: '',
        type: IntegrationType.Woocommerce
    }

    return(
        <Formik
            initialValues={newIntegration}
            onSubmit={(values, { setErrors }) => {
         
                ordersStore.createIntegration(values).then(() =>
                    {
                    ordersStore.loadIntegrations();
                    setOpen(false);
                    }    
                ).catch((errors) => {
                    setErrors(errors);
                    console.log(errors);
                })
            }
            }
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form'
                    onSubmit={handleSubmit}
                    autoComplete='off'
                    style={{ padding: '2rem',marginBottom: '2rem' }}
                >
                    <Header as='h2' textAlign='center'>
                    Dodaj integracje
                        </Header>
                    <FTextInput name='privateName' placeholder='Nazwa Integracji' />
                    <FSelectInput name='groupId' placeholder='Wybierz grupę statusów' options={groupsOptions} />
                    {newIntegration.type === IntegrationType.Woocommerce && (
                        <>
                        <FTextInput name='siteUrl' placeholder='Url strony' />
                        <FTextInput name='client_key' placeholder="Klucz klienta" />
                        <FTextInput name='private_key' placeholder="Klucz prywatny" />
                        </>
                    )}
                    <Button type='submit' icon='check' loading={isSubmitting} floated='right' color='green' />
                </Form>
            )}

        </Formik >
    )
})