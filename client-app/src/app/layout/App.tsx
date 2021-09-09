import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import HomePage from '../../features/home/HomePage';
import UserLogin from '../../features/user/UserLogin';
import HomeNavBar from './HomeNavBar';

function App() {
  return (
    <>
      <Route 
        render={()=>(
          <>
          <HomeNavBar/>
          <Container style={{marginTop: '7em'}} >
          <Route exact path='/'  component={HomePage}/>
          <Route exact path='/logowanie' component={UserLogin} />
          </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
