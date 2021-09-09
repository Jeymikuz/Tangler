import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import HomeDashboardPage from '../../features/dashboard/HomeDashboardPage';
import HomePage from '../../features/home/HomePage';
import UserLogin from '../../features/user/UserLogin';
import { useStore } from '../stores/store';
import DashboardNavbar from './DashboardNavbar';
import HomeNavBar from './HomeNavBar';
import LoaderComponent from './LoaderComponent';

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
        render={() => (
          <>
            <DashboardNavbar />
            <Container>
              <Route exact path='/panel' component={HomeDashboardPage} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
