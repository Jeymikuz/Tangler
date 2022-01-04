import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Confirm, Form, Header} from "semantic-ui-react";
import FTextInput from "../../../app/common/form/FTextInput";
import { StatusGroup } from "../../../app/models/statusGroup";
import { useStore } from "../../../app/stores/store";

interface Props{
    statusGroup: StatusGroup;
    setOpen: (isOpen: boolean) => void;
}

export default observer(function StatusGroupEditForm({statusGroup, setOpen}:Props) {

    const { ordersStore } = useStore();

    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

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
                    style={{ padding: '2rem', marginBottom: '2rem' }}
                >
                    <Header as='h2' textAlign='center'>
                    Edytuj grupę 
                        </Header>
                    <FTextInput name='name' placeholder='Nazwa grupy' />
                    <Button type='submit' icon='check' loading={isSubmitting} floated='right' color='green' />
                    <Button onClick={()=>setOpenDeleteConfirm(true)} type='button' loading={isSubmitting} floated='left' color='red'>Usuń</Button>
                    <Confirm 
                    open={openDeleteConfirm}
                    onCancel={()=>setOpenDeleteConfirm(false)}
                    onConfirm={()=>{
                        ordersStore.deleteStatusGroup(statusGroup.id).then(()=>{
                            setOpenDeleteConfirm(false);
                            setOpen(false);
                        }).catch(()=>{
                            setOpenDeleteConfirm(false);
                            setOpen(false);
                        }); 
                        
                    }}
                    content="Potwierdz usunięcie"
                    cancelButton='Anuluj'

                    />
                </Form>
            )}

        </Formik >
    )
})