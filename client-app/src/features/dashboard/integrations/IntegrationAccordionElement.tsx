import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Accordion, Button, Confirm, Label } from "semantic-ui-react";
import { Integration, IntegrationType } from "../../../app/models/integration";
import { useStore } from "../../../app/stores/store";

interface Props{
  integration: Integration;
}

export default observer(function IntegrationAccordionElement({integration}:Props) {

  const {ordersStore} = useStore();
  const [active, setActive] = useState(false);
  const [showConfirm,setShowConfirm] = useState(false);

  return (
    <>
      <Accordion.Title
        active={active}
        index={1}
        onClick={() => setActive(!active)}
        
      >
        <Label>{IntegrationType[integration.type]}</Label>| {integration.privateName} | {integration.siteUrl} | Połączenie {integration.connectionProblem ? (
          <Label color='red' circular /> ): ( <Label color='green' circular />
        )}
      </Accordion.Title>
      <Accordion.Content active={active} index={1}>
        <Button 
        color='red'
        onClick={() => setShowConfirm(true)}>Usuń integracje</Button>
        <Confirm 
        open={showConfirm}
        content='Czy chcesz usunąć?'
        onCancel={() => setShowConfirm(false)}
        onConfirm={
          ()=> ordersStore.deleteIntegrations(integration.id).then(()=> {
            setShowConfirm(false);
            ordersStore.loadIntegrations();
          })
        }
        />
      </Accordion.Content>
    </>
  );
});
