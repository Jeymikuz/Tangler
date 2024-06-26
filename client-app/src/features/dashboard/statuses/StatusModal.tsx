import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import { Status } from "../../../app/models/status";
import StatusCreateForm from "./StatusCreateForm";
import StatusEditForm from "./StatusEditForm";

interface Props {
    component: React.FunctionComponent | React.ReactElement;
    status?: Status;
    isNew?: boolean;
}

export default observer(function StatusModal({ component, status, isNew }: Props) {
    
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
            {isNew ? (
            <StatusCreateForm setOpen={setOpen} />
            ) : 
            <StatusEditForm 
            status={status!}
            setOpen={setOpen}
            />}
            
        </Modal>
    )
})