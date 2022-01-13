import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Accordion, Button, Confirm, Label } from "semantic-ui-react";
import { UserSettings } from "../../../../app/models/user";
import { useStore } from "../../../../app/stores/store";

interface Props{
    user: UserSettings;
}

export default observer(function UserSettingsAccordionElement({user}:Props){

  const [showConfirm,setShowConfirm] = useState(false);
  const [active, setActive] = useState(false);
  const {userStore} = useStore();

    return(
    <>
        <Accordion.Title
          active={active}
          index={1}
          onClick={() => setActive(!active)}
          
        >
          Login:<Label>{user.userName} </Label>
          <br />
          <br />
          Nazwa Użytkownika:<Label>{user.displayName}</Label>
        </Accordion.Title>
        <Accordion.Content active={active} index={1}>
          <Button 
          color='red'
          onClick={() => setShowConfirm(true)}>Usuń użytkownika</Button>
          <Confirm 
          open={showConfirm}
          content='Czy chcesz usunąć?'
          onCancel={() => setShowConfirm(false)}
           onConfirm={() => {
               userStore.deleteUser(user.userName).then(()=> setShowConfirm(false))
           }
           }
          />
        </Accordion.Content>
      </>
      )
})