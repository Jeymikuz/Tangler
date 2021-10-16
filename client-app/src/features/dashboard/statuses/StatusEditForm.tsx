import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form, Header } from "semantic-ui-react";
import FColorPickerInput from "../../../app/common/form/FColorPickerInput";
import FTextInput from "../../../app/common/form/FTextInput";
import { useStore } from "../../../app/stores/store";

export default observer(function StatusEditForm() {

    const { ordersStore } = useStore();
    const { selectedStatus: status } = ordersStore;

    return (
        <Formik
            initialValues={status!}
            onSubmit={(values, { setErrors }) => {
                ordersStore.editStatus(values).then(() =>
                    ordersStore.setEditStatusModal(false)
                ).catch((errors) => setErrors(errors))
            }
            }
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form'
                    onSubmit={handleSubmit}
                    autoComplete='off'
                    style={{ padding: '2rem' }}
                >
                    <Header as='h2' content='Edytuj status' textAlign='center' />
                    <FTextInput name='name' placeholder='Nazwa statusu' />
                    <FColorPickerInput name='color' placeholder='Kolor HEX' type='text' />
                    <Button type='submit' icon='check' loading={isSubmitting} floated='right' color='green' />
                </Form>
            )}

        </Formik >
    )
})