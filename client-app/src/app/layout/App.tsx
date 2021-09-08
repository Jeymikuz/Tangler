import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import HomePage from '../../features/home/HomePage';
import HomeNavBar from './HomeNavBar';

function App() {
  return (
    <>
      <Route exact path='/' 
        render={()=>(
          <>
          <HomeNavBar/>
          <Container style={{marginTop: '7em'}} >
          <Route component={HomePage}/>
          </Container>
          </>
        )}
      />
    </>
  );
}

export default App;
