import { observer } from "mobx-react-lite";
import React from "react";
import { Container, Menu } from "semantic-ui-react";


export default observer(function HomeNavBar(){
    return(
        <>
        <Menu inverted fixed='top' className='HomeNavBar' >
            <Container>
                <Menu.Header as='h2' content='Tangler'/>
            </Container>
        </Menu>
        </>
    )
})