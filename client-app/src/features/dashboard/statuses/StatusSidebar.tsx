import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Accordion, Button, Label, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import AddOrderModal from "../orders/AddOrderModal";


export default observer(function StatusSidebar(){

    const { ordersStore } = useStore();
    const { statusGroups, setStatusId } = ordersStore;
    
    useEffect(() => {
        if (!statusGroups) ordersStore.loadStatuses();
    }, [statusGroups, ordersStore])


      const accStatuses = statusGroups?.slice().sort(x=>x.index).map(groups =>({
          key: groups.id,
          title: groups.name,
          content: groups.statuses?.slice().sort(x=>x.index).map(statuses=>(
                    <Menu.Item
                    key={statuses.id}
                    name={statuses.name}
                     onClick={() => setStatusId(statuses.id)}>
                         {statuses.name}
                         <Label
                                style={{ backgroundColor: statuses.color}}
                                content='12' />
                     </Menu.Item>
          ))
      }))

    return(
        <div className='container__sidebar' style={{ width: '15rem' }} >
                <AddOrderModal />
                <Menu vertical className='statuses__menu' >
                    <Menu.Item>
                        <Button content='Dodaj zamówienie' icon='plus' circular compact color='yellow'
                            onClick={() => ordersStore.setAddOrderModal(true)}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Menu.Header>Statusy Zamówień</Menu.Header>
                    </Menu.Item>
                    <Menu.Item name='all-orders' onClick={() => setStatusId(0)}>Wszystkie Zamówienia</Menu.Item>

                    <Accordion styled
                    exclusive={false}
                    fluid
                    defaultActiveIndex={[0]}
                    panels={accStatuses}
                    />
                   
                </Menu>
            </div>
    )
})