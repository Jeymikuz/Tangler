import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {
  Accordion,
  Button,
  Container,
  Divider,
  Header,
  Segment,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import StatusesAccordionElement from "./StatusesAccordionElement";
import StatusGroupModal from "./StatusGroupModal";
import StatusModal from "./StatusModal";

export default observer(function Statuses() {
  const { ordersStore } = useStore();
  const { statusGroups } = ordersStore;

  useEffect(() => {
    if (!statusGroups) ordersStore.loadStatuses();
  }, [statusGroups, ordersStore]);

  var sortedGroupsByIndex = undefined;

  if (statusGroups) {
    sortedGroupsByIndex = [...statusGroups!];
    sortedGroupsByIndex.sort((a, b) => (a.index > b.index ? 1 : -1));
  }

  

  return (
    <Segment>
      <Container textAlign="center">
        <Header as="h1" size="large" content="Statusy" color="teal" />
      </Container>
      <Divider />
      <StatusModal
      isNew
      component={<Button  content='Dodaj nowy status' floated='left' />}
      />
      <StatusGroupModal
      isNew
      component={<Button content='Dodaj nową grupę statusów' floated='right' />}
      />
      
      <Container textAlign="center">
            <Accordion styled exclusive={false} fluid>
              {sortedGroupsByIndex?.map((group) => (
                <StatusesAccordionElement group={group} key={group.id} />
              ))}
            </Accordion>
      </Container>
    </Segment>
  );
});
