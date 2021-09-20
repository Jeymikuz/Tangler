import {createContext,useContext} from 'react';
import CommonStore from './commonStore';
import OrdersStore from './ordersStore';
import UserStore from './userStore';

interface Store{
commonStore: CommonStore,
userStore: UserStore,
ordersStore: OrdersStore,
}

export const store: Store = {
commonStore: new CommonStore(),
userStore: new UserStore(),
ordersStore: new OrdersStore()
}


export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}