import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container, Segment } from 'semantic-ui-react';
import HomeDashboardPage from '../../features/dashboard/HomeDashboardPage';
import Orders from '../../features/dashboard/orders/Orders';
import HomePage from '../../features/home/HomePage';
import UserLogin from '../../features/user/UserLogin';
import { useStore } from '../stores/store';
import DashboardNavbar from './DashboardNavbar';
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
            <Segment attached className='dashboard-container'>
              <PrivateRoute exact path='/dashboard' component={HomeDashboardPage} />
              <PrivateRoute exact path='/dashboard/zamowienia' component={Orders} />
            </Segment>
          </>
        )
        }
      />
    </>
  );
}

export default observer(App);
