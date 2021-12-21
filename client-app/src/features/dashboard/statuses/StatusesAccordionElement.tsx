import { observer } from "mobx-react-lite";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Accordion, Button, Divider, Header, Label } from "semantic-ui-react";
import { StatusGroup } from "../../../app/models/statusGroup";
import { useStore } from "../../../app/stores/store";
import StatusGroupModal from "./StatusGroupModal";
import StatusModal from "./StatusModal";

interface Props {
  group: StatusGroup;
}

export default observer(function StatusesAccordionElement({ group }: Props) {
  const [active, setActive] = useState(false);
  const { ordersStore } = useStore();

  var sortedStatusesByIndex = [...group.statuses!].sort((a, b) =>
    a.index > b.index ? 1 : -1
  );

  function onDragEnd(value: any) {
    //
    if (value.source !== null && value.destination !== null) {
      ordersStore.updateStatusOrder(
        group.id,
        value.source.index,
        value.destination.index
      );
    }
  }

  return (
    <>
      <Accordion.Title
        active={active}
        index={group.index}
        onClick={() => setActive(!active)}
      >
        {group.name}
        <StatusGroupModal 
        statusGroup={group}
        component={<Button icon='edit outline' floated='right' style={{background: 'rgba(0, 0, 0, 0.0)'}} />}
        />
      </Accordion.Title>
      <DragDropContext onDragEnd={(value) => onDragEnd(value)}>
        <Droppable droppableId={group.index.toString()}>
          {({ droppableProps, placeholder, innerRef }) => (
            <Accordion.Content active={active} index={group.index}>
              <ul
                style={{ listStyleType: "none" }}
                {...droppableProps}
                ref={innerRef}
              >
                {sortedStatusesByIndex!.map((status) => (
                  <Draggable
                    key={status.id}
                    draggableId={status.id.toString()}
                    index={status.index}
                  >
                    {({ draggableProps, dragHandleProps, innerRef }) => (
                      <li
                        key={status.id}
                        {...draggableProps}
                        {...dragHandleProps}
                        ref={innerRef}
                      >
                        <Divider />
                        {status.index}

                        <Header as="h4" floated="left">
                          {status.name}
                          <Label style={{ background: status.color }} />
                        </Header>
                        <Button
                          content="Usuń"
                          color="red"
                          size="tiny"
                          floated="right"
                          onClick={()=> ordersStore.deleteStatus(status.id)}
                        />
                        <StatusModal
                          status={status}
                          component={
                            <Button
                              content="Edytuj"
                              color="yellow"
                              size="tiny"
                              floated="right"
                            />
                          }
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {placeholder}
              </ul>
            </Accordion.Content>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
});
