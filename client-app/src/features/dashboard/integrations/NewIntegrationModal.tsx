import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import NewIntegrationForm from "./NewIntegrationForm";

interface Props {
    component: React.FunctionComponent | React.ReactElement;
}

export default observer(function NewIntegrationModal({ component }: Props) {
    
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
            <NewIntegrationForm setOpen={setOpen} />
        </Modal>
    )
})