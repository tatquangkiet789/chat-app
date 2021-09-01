import React from 'react';
import './App.css';
import ChatRoom from './components/ChatRoom/ChatRoom';
import SignIn from './components/SignIn/SignIn';
import UserProvider from './components/Context/UserProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
            <Switch>
              <Route component={SignIn} path="/login" />
              <Route component={ChatRoom} path="/" />
            </Switch>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
