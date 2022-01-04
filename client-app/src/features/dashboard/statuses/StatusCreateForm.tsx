import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, DropdownItemProps, Form, Header } from "semantic-ui-react";
import FColorPickerInput from "../../../app/common/form/FColorPickerInput";
import FSelectInput from "../../../app/common/form/FSelectInput";
import FTextInput from "../../../app/common/form/FTextInput";
import { Status } from "../../../app/models/status";
import { useStore } from "../../../app/stores/store";

interface Props{
    setOpen: (isOpen: boolean) => void;
}

export default observer(function StatusCreateForm({setOpen}:Props){
    
    const {ordersStore} = useStore();

    const groupsOptions: DropdownItemProps[] = [];
    ordersStore.statusGroups?.forEach(x=> groupsOptions.push({
        key: x.id,
        value: x.id,
        text: x.name
    }))

    const status: Status = {
        id: 0,
        color: '#FFFFFF',
        name: '',
        index: 0
    }
    const initialVal = {
        status: status,
        groupId: 0
    }


    return(
        <Formik
            initialValues={initialVal}
            onSubmit={(values, { setErrors }) => {
         
                ordersStore.createStatus(values.groupId,values.status).then(() =>
                    setOpen(false)
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
                    Utwórz status
                    <Header sub>ID: {status?.id}</Header>
                        </Header>
                    <FTextInput name='status.name' placeholder='Nazwa statusu' />
                    <FSelectInput name='groupId' placeholder='Wybierz grupę statusów' options={groupsOptions} />
                    <FColorPickerInput name='status.color' placeholder='Kolor HEX' type='text' />
                    <Button type='submit' icon='check' loading={isSubmitting} floated='right' color='green' />
                </Form>
            )}

        </Formik >
    )
})