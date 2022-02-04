import React from 'react';
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import FTextInput from '../../../../app/common/form/FTextInput';
import { useStore } from '../../../../app/stores/store';
import { NewUser } from '../../../../app/models/user';
import * as Yup from 'yup';

interface Props{
    setOpen: (isOpen: boolean) => void;
}

export default observer(function NewUserForm({setOpen}:Props){

    const {userStore} = useStore();

    const newUser: NewUser = {
        displayName: '',
        password: '',
        userName: '',
    } 

    const validationSchema = Yup.object({
        userName: Yup.string().required('Należy podać nazwę użytkownika'),
        password: Yup.string().required('Należy podać hasło').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Musi zawierać 8 znaków, Jedną dużą literę, Jedną małą literę, Jedną cyfre i Jeden znak specjalny"
          ),
        displayName: Yup.string().required('Nazwa użytkownika jest wymagana')
    })

    return(
        <Formik
            initialValues={newUser}
            onSubmit={(values, { setErrors }) => {
                userStore.createUser(values).then(()=> setOpen(false))
            }
            }
            validationSchema={validationSchema}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form'
                    onSubmit={handleSubmit}
                    autoComplete='off'
                    style={{ padding: '2rem',marginBottom: '2rem' }}
                >
                    <Header as='h2' textAlign='center'>
                    Dodaj użytkownika
                        </Header>
                    <FTextInput name='userName' placeholder='Login użytkownika' />
                    <FTextInput name='displayName' placeholder='Nazwa użytkownika' />
                    <FTextInput type='password' name='password' placeholder='Hasło' />
                   
                    <Button type='submit' icon='check' loading={isSubmitting} floated='right' color='green' />
                </Form>
            )}

        </Formik >
    )
})