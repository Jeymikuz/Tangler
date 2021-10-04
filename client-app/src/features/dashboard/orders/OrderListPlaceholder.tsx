import React from "react";
import { Placeholder, Table } from "semantic-ui-react";

export default function OrderListPlaceholder() {

    const n = 10;

    return (
        <Table.Body>
            {[...Array(n)].map((e, i) => (
                <Table.Row key={i} >
                    <Table.Cell>
                        <Placeholder>
                            <Placeholder.Line />
                        </Placeholder>
                    </Table.Cell>
                    <Table.Cell>
                        <Placeholder>
                            <Placeholder.Line />
                        </Placeholder>
                    </Table.Cell>
                    <Table.Cell>
                        <Placeholder>
                            <Placeholder.Line />
                        </Placeholder>
                    </Table.Cell>
                    <Table.Cell>
                        <Placeholder>
                            <Placeholder.Line />
                        </Placeholder>
                    </Table.Cell>
                </Table.Row>
            ))
            }
        </Table.Body >
    )
}