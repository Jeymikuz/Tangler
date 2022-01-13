import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import NewUserForm from "./NewUserForm";

interface Props {
    component: React.FunctionComponent | React.ReactElement;
}

export default observer(function UserSettingsnModal({ component }: Props) {
    
    const [isOpen, setOpen] = useState(false);

    return (
        <Modal
            closeIcon
            size='tiny'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={isOpen}
            trigger={component}
        >
            <NewUserForm setOpen={setOpen} />
        </Modal>
    )
})