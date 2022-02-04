import React from "react";
import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Form, Grid, Header, Label, Segment } from "semantic-ui-react";
import FTextInput from "../../app/common/form/FTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import { Colors } from "../../app/common/Colors";

export default observer(function UserRegistration() {

    const { userStore } = useStore();
    const digitsOnly = (value:any) => /^\d+$/.test(value)

    const validationSchema = Yup.object({
        username: Yup.string().required('Należy podać nazwę użytkownika'),
        password: Yup.string().required('Należy podać hasło').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Musi zawierać 8 znaków, Jedną dużą literę, Jedną małą literę, Jedną cyfre i Jeden znak specjalny"
          ),
        name: Yup.string().required('Nazwa firmy jest wymagana'),
        nip: Yup.string().required('Numer NIP jest wymagany').test('Tylko liczby','Pole powinno zawierać tylko liczby', digitsOnly),
        email: Yup.string().email('Nie poprawny format').required('Email jest wymagany'),
        displayName: Yup.string().required('Nazwa użytkownika jest wymagana')
    })

    return (
        <Grid textAlign='center' style={{ marginTop: '50%' }}>
            <Segment className='login-segment' compact raised>
                <Formik

                    initialValues={{ username: '', password: '', email: '', nip: '',displayName: '', name: '', error: null }}
                    onSubmit={(values, { setErrors }) => userStore.login(values).catch(error => {
                        setErrors({ error: 'Nie poprawna nazwa użytknownika lub hasło' })
                    })}
                    validationSchema={validationSchema}
                >
                    {({ handleSubmit, isSubmitting, errors }) => (
                        <Form className='ui form login-segment' onSubmit={handleSubmit} autoComplete='off' style={{ padding: 30 }}>

                            <Header as='h2' content='Zarejestruj się' textAlign='center' />
                            <Grid columns={2}>
                                <Grid.Row>
                                <FTextInput label="Nazwa Firmy" name='name' placeholder='Nazwa' />
                                <FTextInput label="NIP" name='nip' placeholder='Numer NIP' />
                                </Grid.Row>
                            </Grid>
                            <Grid columns={2}>
                                <Grid.Row>
                                <FTextInput label="Nazwa Wyświetlana" name='displayName' placeholder='Nazwa' />
                                <FTextInput label="Email" name='email' placeholder='adres email' />
                                </Grid.Row>
                            </Grid>
                            <FTextInput label="Login" name='username' placeholder='Login' />
                            <FTextInput label="Hasło" name='password' placeholder='Hasło' type='password' />
                            <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />
                            <Button loading={isSubmitting} fluid content='Zarejestruj' type='submit' style={{background: Colors.orange}} />
                        </Form>
                    )}
                </Formik>
            </Segment>
        </Grid>
    )
})