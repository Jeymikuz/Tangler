import { observer } from "mobx-react-lite";
import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export default observer(function LoaderComponent() {
    return (
        <Dimmer active>
            <Loader inverted>Ładowanie...</Loader>
        </Dimmer>
    )
})