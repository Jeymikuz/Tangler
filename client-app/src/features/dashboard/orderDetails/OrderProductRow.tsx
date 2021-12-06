import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Dropdown, Icon, Table } from "semantic-ui-react";
import { OrderProduct } from "../../../app/models/orderProduct";
import OrderProductRowEdit from "./edit/OrderProductRowEdit";

interface Props {
  product: OrderProduct;
  editMode?: boolean;
}

export default observer(function OrderProdutRow({ product, editMode }: Props) {

    useEffect(()=>{
        if(editMode){
            setEditMode(editMode);
        };
    },[editMode])

    const [isEditMode, setEditMode] = useState(false);

  return (
    <>
      {isEditMode ? (
          <OrderProductRowEdit product={product} editMode={setEditMode} />
      ) : (
        <Table.Row>
          <Table.Cell width="1" textAlign="center">
            <Icon name="box" />
          </Table.Cell>
          <Table.Cell width="1" singleLine>
            {product.externalId}
          </Table.Cell>
          <Table.Cell singleLine>{product.name}</Table.Cell>
          <Table.Cell width="1" singleLine>
            {product.quantity}
          </Table.Cell>
          <Table.Cell width="1" singleLine>
            {product.price} PLN
          </Table.Cell>
          <Table.Cell width="1" singleLine>
            23%
          </Table.Cell>
          <Table.Cell width="1" singleLine>
            {product.weight}kg
          </Table.Cell>
          <Table.Cell width="1" singleLine>
            <Dropdown icon="cogs">
              <Dropdown.Menu>
                <Dropdown.Item icon="edit" onClick={() => setEditMode(!isEditMode)} />
                <Dropdown.Item icon="delete" />
              </Dropdown.Menu>
            </Dropdown>
          </Table.Cell>
        </Table.Row>
      )}
    </>
  );
});
