import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form, Header} from "semantic-ui-react";
import FColorPickerInput from "../../../app/common/form/FColorPickerInput";
import FTextInput from "../../../app/common/form/FTextInput";
import { StatusGroup } from "../../../app/models/statusGroup";
import { useStore } from "../../../app/stores/store";

interface Props{
    statusGroup: StatusGroup;
    setOpen: (isOpen: boolean) => void;
}

export default observer(function StatusGroupEditForm({statusGroup, setOpen}:Props) {

    const { ordersStore } = useStore();

    return (
        <Formik
            initialValues={statusGroup}
            onSubmit={(values, { setErrors }) => {
                ordersStore.editGroupStatus(values).then(() =>
                    setOpen(false)
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
                    <Header as='h2' textAlign='center'>
                    Edytuj grupę 
                        </Header>
                    <FTextInput name='name' placeholder='Nazwa grupy' />
                    <Button type='submit' icon='check' loading={isSubmitting} floated='right' color='green' />
                </Form>
            )}

        </Formik >
    )
})