import { observer } from "mobx-react-lite";
import React from "react";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import AddOrderForm from "./AddOrderForm";


export default observer(function AddOrderModal() {

    const { ordersStore } = useStore();

    return (
        <Modal
            onClose={() => ordersStore.setAddOrderModal(false)}
            onOpen={() => ordersStore.setAddOrderModal(true)}
            open={ordersStore.addOrderModal}
        >
            <Modal.Header>Dodaj zamówienie</Modal.Header>
            <Modal.Content>
                <AddOrderForm />
            </Modal.Content>
        </Modal>
    )
})