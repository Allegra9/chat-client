import React, { Component, Fragment } from 'react';
// import './App.css'; <-- commented out for styling
import ConversationsList from './components/ConversationsList';

import SignUpForm from './components/user/SignUpForm'
import LoginForm from './components/user/LoginForm'



class App extends Component {

  state = {
    active_user : undefined
  }

  handleLogin = (user) => {
    this.setState({
      active_user : user
    })
  }

  render() {
    return (
      <div className="App">
        {
          this.state.active_user ?
          <Fragment>
            <h1> WELCOME {this.state.active_user.name} </h1>
            <ConversationsList activeUser={this.state.active_user}/>
          </Fragment> : <SignUpForm handleLogin={this.handleLogin}/>
        }
      </div>
    );
  }
}

export default App;
