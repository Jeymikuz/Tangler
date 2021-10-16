import React from "react";
import { observer } from "mobx-react-lite";
import { Order } from "../../../app/models/order";
import { Grid, Segment } from "semantic-ui-react";
import OrderInfoDetails from "./OrderInfoDetails";
import OrderInfoDelivery from "./OrderInfoDelivery";
import OrderInfoInvoice from "./OrderInfoInvoice";
import OrderInfoPickupPoint from "./OrderInfoPickupPoint";

interface Props {
    order: Order;
}

const descriptionStyle = {
    color: '#bfb3b3'
}

export default observer(function OrderInfo({ order }: Props) {
    return (
        <>
            <Grid>
                <Grid.Row columns={2} >
                    <Grid.Column>
                        <OrderInfoDetails descriptionStyle={descriptionStyle} order={order} />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment style={{ marginRight: 50, height: '100%' }} >
                            <Grid>
                                <Grid.Row divided columns={3}>
                                    <Grid.Column>
                                        <OrderInfoDelivery descriptionStyle={descriptionStyle} order={order} />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <OrderInfoInvoice descriptionStyle={descriptionStyle} order={order} />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <OrderInfoPickupPoint descriptionStyle={descriptionStyle} order={order} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                        </Segment>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        </>
    )
})