import React from 'react';
import './App.css';
import ChatRoom from './components/ChatRoom/ChatRoom';
import SignIn from './components/SignIn/SignIn';

function App() {
  return (
    <div className="App">
      <h1>App Component</h1>
      <SignIn />
      <ChatRoom />
    </div>
  );
}

export default App;
