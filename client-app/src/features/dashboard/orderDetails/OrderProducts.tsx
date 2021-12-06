import { observer } from "mobx-react-lite";
import React from "react";
import { Button,  Header,  Icon, Table } from "semantic-ui-react";
import { Order } from "../../../app/models/order";
import { useStore } from "../../../app/stores/store";
import OrderProductRow from "./OrderProductRow";

interface Props {
  order: Order;
}

export default observer(function OrderProducts({ order }: Props) {

  const {ordersStore} = useStore();

  return (
    <>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Icon name="image" />
            </Table.HeaderCell>
            <Table.HeaderCell>
              Id
              <Header sub color='grey' >Zewnętrzne</Header>
              </Table.HeaderCell>
            <Table.HeaderCell>Nazwa</Table.HeaderCell>
            <Table.HeaderCell>Ilość</Table.HeaderCell>
            <Table.HeaderCell>Cena</Table.HeaderCell>
            <Table.HeaderCell>Vat</Table.HeaderCell>
            <Table.HeaderCell>Waga</Table.HeaderCell>
            <Table.HeaderCell>Akcje</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {order.products &&
            order.products.map((product) => (
            <OrderProductRow key={product.id} product={product} />
            ))}
        </Table.Body>
      </Table>
      <Button  floated='right' color='yellow' icon='add' circular onClick={() => {
          ordersStore.addNewProductToOrder();
      }} />
    </>
  );
});
