import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button,  Icon, Input, Table } from "semantic-ui-react";
import { OrderProduct } from "../../../../app/models/orderProduct";
import { useStore } from "../../../../app/stores/store";

interface Props {
  product: OrderProduct;
  editMode: (isEditMode: boolean) => void;
}

export default observer(function OrderProductRowEdit({
  product,
  editMode,
}: Props) {

  const { ordersStore } = useStore();
  
  const [editedProduct, setEditedProduct] = useState<OrderProduct>(product)


  return (   
    <Table.Row key={product.id}>
            <Table.Cell  width="1" textAlign="center">
              <Icon name="box" />
            </Table.Cell>
            <Table.Cell width="1" textAlign="center">
            <Input disabled value={editedProduct.externalId} />           
            </Table.Cell>
            <Table.Cell  singleLine>
              <Input  value={editedProduct.name} onChange={(evt: any) => {
                console.log(evt.target.value);
                setEditedProduct({...editedProduct, name: evt.target.value});
              }} />
            </Table.Cell>
            <Table.Cell width="1"  singleLine>
              <Input  
                type='number'
                min='0'
                step='1'
                value={editedProduct.quantity} onChange={(evt: any) => {
                console.log(evt.target.value);
                setEditedProduct({...editedProduct, quantity: evt.target.value});
              }} />
            </Table.Cell>
            <Table.Cell width="1" singleLine>
            <Input  
                type='number'
                min='0'
                step='.01'
                label={{basic:true, content:'zł'}}
                labelPosition='right'
                value={editedProduct.price} onChange={(evt: any) => {
                console.log(evt.target.value);
                setEditedProduct({...editedProduct, price: evt.target.value});
              }} />
            </Table.Cell>
            <Table.Cell width="1" singleLine>
              <Input 
              label={{basic:true, content:'%'}}
              labelPosition='right'
              value="23" />
            </Table.Cell>
            <Table.Cell width="1" singleLine>
            <Input
                label={{basic:true, content:'kg'}}
                labelPosition='right'
                type='number'
                min='0'
                step='.01'
                value={editedProduct.weight} onChange={(evt: any) => {
                console.log(evt.target.value);
                setEditedProduct({...editedProduct, weight: evt.target.value});
              }} />
            </Table.Cell>
            <Table.Cell width="1" singleLine>
              <Button onClick={() => {
                ordersStore.editProductOrder(editedProduct);
                editMode(false);
              }} type="button" content="Edytuj" />
            </Table.Cell>
      </Table.Row>
  );
});
