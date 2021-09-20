import { observer } from "mobx-react-lite";
import React from "react";
import { Dropdown, Icon, Tab, Table } from "semantic-ui-react";
import { Order } from "../../../app/models/order";

interface Props {
    order: Order;
}

export default observer(function OrderProducts({ order }: Props) {
    return (
        <Table celled padded >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell><Icon name='image' /></Table.HeaderCell>
                    <Table.HeaderCell>Id</Table.HeaderCell>
                    <Table.HeaderCell>Nazwa</Table.HeaderCell>
                    <Table.HeaderCell>Ilość</Table.HeaderCell>
                    <Table.HeaderCell>Cena</Table.HeaderCell>
                    <Table.HeaderCell>Vat</Table.HeaderCell>
                    <Table.HeaderCell>Waga</Table.HeaderCell>
                    <Table.HeaderCell>Akcje</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {order.products.map(product => (
                    <Table.Row>
                        <Table.Cell width='1' textAlign='center' >
                            <Icon name='box' />
                        </Table.Cell>
                        <Table.Cell width='1' singleLine>
                            {product.id}
                        </Table.Cell>
                        <Table.Cell singleLine>
                            {product.name}
                        </Table.Cell>
                        <Table.Cell width='1' singleLine>
                            {product.quantity}
                        </Table.Cell>
                        <Table.Cell width='1' singleLine>
                            10 PLN
                        </Table.Cell>
                        <Table.Cell width='1' singleLine>
                            23%
                        </Table.Cell>
                        <Table.Cell width='1' singleLine>
                            4kg
                        </Table.Cell>
                        <Table.Cell width='1' singleLine>
                            <Dropdown icon='cogs' >
                                <Dropdown.Menu >
                                    <Dropdown.Item icon='edit' />
                                    <Dropdown.Item icon='delete' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
})