import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import InvoicesList from "./invoices/InvoicesList";

export default observer(function Document(){
    
    const panes = [
        {menuItem: 'Faktury', render: () => <InvoicesList /> },
        {menuItem: 'Paragony', render: () => <></> },
    ]

    return(
        <Tab panes={panes} />
    )
})