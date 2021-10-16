import { observer } from "mobx-react-lite";
import React from "react";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import StatusEditForm from "./StatusEditForm";

interface Props {
    component: React.FunctionComponent | React.ReactElement;
}

export default observer(function StatusModal({ component }: Props) {
    const { ordersStore } = useStore();

    return (
        <Modal
            closeIcon
            size='tiny'
            onClose={() => ordersStore.setEditStatusModal(false)}
            onOpen={() => ordersStore.setEditStatusModal(true)}
            open={ordersStore.statusEditModal}
            trigger={component}
        >
            <StatusEditForm />
        </Modal>
    )
})