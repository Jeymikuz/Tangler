import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container, Segment } from 'semantic-ui-react';
import Documents from '../../features/dashboard/documents/Documents';
import HomeDashboardPage from '../../features/dashboard/HomeDashboardPage';
import Integrations from '../../features/dashboard/integrations/Integrations';
import OrderDetails from '../../features/dashboard/orderDetails/OrderDetails';
import Orders from '../../features/dashboard/orders/Orders';
import Settings from '../../features/dashboard/settings/Settings';
import UserSettings from '../../features/dashboard/settings/usersSettings/UserSettings';
import Statuses from '../../features/dashboard/statuses/Statuses';
import HomePage from '../../features/home/HomePage';
import UserLogin from '../../features/user/UserLogin';
import { useStore } from '../stores/store';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import HomeNavBar from './HomeNavBar';
import LoaderComponent from './LoaderComponent';
import PrivateRoute from './PrivateRoute';

function App() {

  const { commonStore, userStore } = useStore()
  useEffect(() => {
    if (commonStore.token) {
      userStore.getCurrentUser().finally(() => commonStore.setAppLoaded());
    }
    else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoaderComponent />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route
        exact path={['/', '/logowanie', '/kontakt', '/funkcje', '/pomoc', '/funkcje/manager-zamowien', '/funkcje/manager-produktow', '/intergracje']}
        render={() => (
          <>
            <HomeNavBar />
            <Container style={{ marginTop: '7em' }} >
              <Route exact path='/' component={HomePage} />
              <Route exact path='/logowanie' component={UserLogin} />
            </Container>
          </>
        )}
      />
      <Route
        path={['/dashboard/(.+)', '/dashboard']}
        render={() => (
          <>
            <DashboardNavbar />
            <div className='container__dashboard' style={{ marginTop: 43 }}>
              <DashboardSidebar />
              <Segment className='container__main' style={{ margin: 0, padding: 0 }} >
                <PrivateRoute exact path='/dashboard' component={HomeDashboardPage} />
                <PrivateRoute exact path='/dashboard/zamowienia' component={Orders} />
                <PrivateRoute exact path='/dashboard/zamowienia/:id' component={OrderDetails} />
                <PrivateRoute exact path='/dashboard/statusy' component={Statuses} />
                <PrivateRoute exact path='/dashboard/integracje' component={Integrations} />
                <PrivateRoute exact path='/dashboard/ustawienia/uzytkownicy' component={UserSettings} />
                <PrivateRoute exact path='/dashboard/dokumenty' component={Documents} />
                <PrivateRoute exact path='/dashboard/ustawienia' component={Settings} />
              </Segment>
            </div>

          </>
        )
        }
      />
    </>
  );
}

export default observer(App);
