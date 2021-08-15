import React from 'react';
import './App.css';
import ChatRoom from './components/ChatRoom/ChatRoom';
import SignIn from './components/SignIn/SignIn';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <ChatRoom /> : <SignIn />}
    </div>
  );
}

export default App;
