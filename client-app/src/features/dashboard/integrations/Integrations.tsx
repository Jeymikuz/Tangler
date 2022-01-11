import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Accordion, Button, Container, Divider, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import IntegrationAccordionElement from "./IntegrationAccordionElement";
import NewIntegrationModal from "./NewIntegrationModal";

export default observer(function Integrations(){

    const {ordersStore} = useStore();
    const {integrations} = ordersStore;

    useEffect(()=>{
        ordersStore.loadIntegrations();
    },[ordersStore])

    return(
        <Segment>
             <Container textAlign="center">
                <Header as="h1" size="large" content="Integracje" color="teal" />
             </Container>
            <Divider />
            <NewIntegrationModal 
            component={<Button content='Dodaj Integracje'/>}
            />
            <Container
            textAlign="center"
            >
                <Accordion styled exclusie={false} fluid>
                    {integrations && 
                        integrations.map(integration => (
                            <IntegrationAccordionElement integration={integration} />
                        ))
                    }
                </Accordion>
            </Container>
        </Segment>
    )
})