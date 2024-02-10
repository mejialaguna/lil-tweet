import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import {
  Home,
  Login,
  Register,
  MenuBar,
  AuthRoute,
  SinglePost,
} from './components';
import { Container } from 'semantic-ui-react';
import { AuthProvider } from './utils/auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container textAlign='justified'>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path='/post/:postId' component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
