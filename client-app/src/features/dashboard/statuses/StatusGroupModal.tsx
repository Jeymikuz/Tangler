import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Modal } from "semantic-ui-react";
import { StatusGroup } from "../../../app/models/statusGroup";
import StatusGroupCreateForm from "./StatusGroupCreateForm";
import StatusGroupEditForm from "./StatusGroupEditForm";

interface Props {
    component: React.FunctionComponent | React.ReactElement;
    statusGroup?: StatusGroup;
    isNew?: boolean;
}

export default observer(function StatusGroupModal({ component, statusGroup, isNew }: Props) {
    
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
            <StatusGroupCreateForm setOpen={setOpen} />
            ) : 
            <StatusGroupEditForm statusGroup={statusGroup!} setOpen={setOpen} />
            } 
            
        </Modal>
    )
})