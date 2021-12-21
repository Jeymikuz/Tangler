import { observer } from "mobx-react-lite";
import React from "react";
import StatusSidebar from "../statuses/StatusSidebar";
import OrdersList from "./OrdersList";


export default observer(function Orders() {
    return (
        <div className='container__dashboard'>
            <StatusSidebar />
            <div className='container__main' style={{ paddingRight: 20 }}>
                <OrdersList />
            </div>
        </div >
    )
})