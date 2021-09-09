import React, { useEffect } from "react";
import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Form, Grid, Header, Label, Segment } from "semantic-ui-react";
import FTextInput from "../../app/common/form/FTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import { history } from "../..";

export default observer(function UserLogin() {

    const { userStore } = useStore();
    const validationSchema = Yup.object({
        username: Yup.string().required('Należy podać nazwę użytkownika'),
        password: Yup.string().required('Należy podać hasło')
    })

    useEffect(() => {
        if (userStore.user) history.push('/panel');
    }, [userStore])

    return (
        <Grid textAlign='center' style={{ marginTop: '50%' }}>
            <Segment compact >
                <Formik
                    initialValues={{ username: '', password: '', error: null }}
                    onSubmit={(values, { setErrors }) => userStore.login(values).catch(error => {
                        setErrors({ error: 'Nie poprawna nazwa użytknownika lub hasło' })
                    })}
                    validationSchema={validationSchema}
                >
                    {({ handleSubmit, isSubmitting, errors }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' style={{ padding: 30 }}>
                            <Header as='h2' content='Zaloguj się do panelu' textAlign='center' />
                            <FTextInput name='username' placeholder='Nazwa użytkownika' />
                            <FTextInput name='password' placeholder='Hasło' type='password' />
                            <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />
                            <Button loading={isSubmitting} positive content='Zaloguj' type='submit' />
                        </Form>
                    )}
                </Formik>
            </Segment>
        </Grid>
    )
})