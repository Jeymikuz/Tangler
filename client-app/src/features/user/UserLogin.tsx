import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form, Header, Label } from "semantic-ui-react";
import FTextInput from "../../app/common/form/FTextInput";
import { useStore } from "../../app/stores/store";

export default observer(function UserLogin(){
    
    const { userStore } = useStore();

    return(
          <>
            <Formik
                initialValues={{ username: '', password: '', error: null }}
                onSubmit={(values, { setErrors }) => userStore.login(values).catch(error => setErrors({ error: 'Niepoprawna nazwa użytknownika lub hasło' }))}
            >
                {({ handleSubmit, isSubmitting, errors }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' style={{textAlign: 'center'}} >
                        <Header as='h2' content='Zaloguj się do panelu' textAlign='center'/>
                        <FTextInput name='username' placeholder='Nazwa użytkownika' />
                        <FTextInput name='password' placeholder='Hasło' type='password' />
                        <ErrorMessage name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />} />
                        <Button loading={isSubmitting} positive content='Zaloguj' type='submit' />
                    </Form>
                )}
            </Formik>
        </>
    )
})