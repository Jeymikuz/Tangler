import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, DropdownItemProps, Form, Header } from "semantic-ui-react";
import FTextInput from "../../../app/common/form/FTextInput";
import { StatusGroup } from "../../../app/models/statusGroup";
import { useStore } from "../../../app/stores/store";

interface Props{
    setOpen: (isOpen: boolean) => void;
}

export default observer(function StatusGroupCreateForm({setOpen}:Props){
    
    const {ordersStore} = useStore();

    const groupsOptions: DropdownItemProps[] = [];
    ordersStore.statusGroups?.forEach(x=> groupsOptions.push({
        key: x.id,
        value: x.id,
        text: x.name
    }))

    const statusGroup: StatusGroup = {
        id: 0,
        name: '',
        index: 0,
        statuses: []
    }


    return(
        <Formik
            initialValues={statusGroup}
            onSubmit={(values, { setErrors }) => {
                ordersStore.createGroupsStatus(values.name).then(()=> setOpen(false));
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
                    Utwórz grupę statusów
                        </Header>
                    <FTextInput name='name' placeholder='Nazwa grupy' />
                    <Button type='submit' icon='check' loading={isSubmitting} floated='right' color='green' />
                </Form>
            )}

        </Formik >
    )
})