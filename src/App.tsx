import React from 'react';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import UserProvider from './components/Context/UserProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ChatWindow from './components/ChatWindow/ChatWindow';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
            <Switch>
              <Route component={SignIn} path="/login" />
              <Route component={ChatWindow} path="/" />
            </Switch>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
