import { observer } from "mobx-react-lite";
import React from "react";
import { Header, Segment, Divider, Tab } from "semantic-ui-react";
import SettingsInfo from "./SettingsInfo";

export default observer(function Settings(){
    
    const panes = [
        {menuItem: 'Informacje', render: ()=> <SettingsInfo />}
    ]
    
    return(
        <Segment 
            
        padded
        style={{margin: 'auto', textAlign: 'center', maxWidth: 800, marginTop: 50, minHeight: '80%'}}
        >
            <Header content='Ustawienia' />
            <Divider />
            <Tab panes={panes} />
        </Segment>
    )
})