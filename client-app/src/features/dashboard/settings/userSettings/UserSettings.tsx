import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Container, Divider, Header, Segment } from "semantic-ui-react";
import { UserSettings } from "../../../../app/models/user";
import { useStore } from "../../../../app/stores/store";
import UserSettingsAccordionElement from "./UserSettingsAccordionElement";
import UserSettingsModal from "./UserSettingsModal";

export default observer(function UserSettings(){

    const {userStore} = useStore();

    const [users, setUsers] = useState<UserSettings[]>();

    useEffect(()=>{

        async function loadUsers() {
            let dtoUsers  = await userStore.loadUsers();
            setUsers(dtoUsers);
        } 

        loadUsers();

    },[userStore])

    return(
    <>
    <Segment>
      <Container textAlign="center">
        <Header as="h1" size="large" content="Użytkownicy" color="teal" />
      </Container>
      <Divider />
      <UserSettingsModal
      component={<Button content='Nowy użytkownik' />}
      />
      <Container textAlign="center">
            <Accordion styled exclusive={false} fluid>
             {users && users.map(user => (
                 <UserSettingsAccordionElement key={user.id} user={user} />
             ))}
            </Accordion>
      </Container>

        

    </Segment>
    </>
    )
})