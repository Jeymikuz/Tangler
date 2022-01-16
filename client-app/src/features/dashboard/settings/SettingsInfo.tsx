import { observer } from "mobx-react-lite";
import React from "react";
import { Segment } from "semantic-ui-react";
import SettingsInfoForm from "./SettingsInfoForm";

export default observer(function SettingsInfo(){
    
    return(
        <>
        <SettingsInfoForm />
        </>
    )
})