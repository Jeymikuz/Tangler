import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { ErrorMessage, Formik } from "formik";
import { Button, Form, Header, Label } from "semantic-ui-react";
import FTextInput from "../../app/common/form/FTextInput";

export default observer(function HomePage() {

    const { userStore } = useStore();

    return (
        <>
            <Formik
                initialValues={{ username: '', password: '', error: null }}
                onSubmit={(values, { setErrors }) => userStore.login(values).catch(error => setErrors({ error: 'Niepoprawna nazwa użytknownika lub hasło' }))}
            >
                {({ handleSubmit, isSubmitting, errors }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Header as='h2' content='Login test' textAlign='center' color='purple' />
                        <FTextInput name='username' placeholder='Nazwa użytkownika' />
                        <FTextInput name='password' placeholder='Hasło' type='password' />
                        <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />
                        <Button loading={isSubmitting} positive content='Zaloguj' type='submit' />
                    </Form>
                )}
            </Formik>

            <h1>HomePage</h1>
            {userStore.user && (
                <h1>Displayname: {userStore.user.displayName}</h1>
            )}
        </>
    )
})
