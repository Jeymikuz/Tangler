import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form, Header} from "semantic-ui-react";
import FColorPickerInput from "../../../app/common/form/FColorPickerInput";
import FTextInput from "../../../app/common/form/FTextInput";
import { Status } from "../../../app/models/status";
import { useStore } from "../../../app/stores/store";

interface Props{
    status: Status;
    setOpen: (isOpen: boolean) => void;
}

export default observer(function StatusEditForm({status, setOpen}:Props) {

    const { ordersStore } = useStore();

    
    

    return (
        <Formik
            initialValues={status!}
            onSubmit={(values, { setErrors }) => {
                ordersStore.editStatus(values).then(() =>
                    setOpen(false)
                ).catch((errors) => setErrors(errors))
            }
            }
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className='ui form'
                    onSubmit={handleSubmit}
                    autoComplete='off'
                    style={{ padding: '2rem' ,marginBottom: '2rem' }}
                >
                    <Header as='h2' textAlign='center'>
                    Edytuj status
                    <Header sub>ID: {status?.id}</Header>
                        </Header>
                    <FTextInput name='name' placeholder='Nazwa statusu' />
                    <FColorPickerInput name='color' placeholder='Kolor HEX' type='text' />
                    <Button type='submit' icon='check' loading={isSubmitting} floated='right' color='green' />
                </Form>
            )}

        </Formik >
    )
})