import React, { Component } from 'react';
// import './App.css'; <-- commented out for styling
import ConversationsList from './components/ConversationsList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ConversationsList />
      </div>
    );
  }
}

export default App;
