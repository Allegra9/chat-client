import React, { Component, Fragment } from 'react';
// import './App.css'; <-- commented out for styling
import ConversationsList from './components/ConversationsList';

import SignUpForm from './components/user/SignUpForm'
import LoginForm from './components/user/LoginForm'

import Button from '@material-ui/core/Button';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';


class App extends Component {

  state = {
    active_user : undefined
  }

  handleLogin = (user) => {
    this.setState({
      active_user : user
    })
  }

  handleLogout = () => {
    this.setState({
      active_user : undefined
    })
  }

  render() {
    return (
      <div className="App">
         <MuiThemeProvider theme={theme}>
            <Button variant="outlined"  color="secondary">TEST BUTTON</Button>
            <Button variant="outlined"  color="primary">TEST BUTTON</Button>

          </MuiThemeProvider>

        {
          this.state.active_user ?
          <Fragment>
            <h1> WELCOME {this.state.active_user.name} </h1>

            <Button color="primary" onClick={this.handleLogout}>LOGOUT</Button>

            <ConversationsList activeUser={this.state.active_user}/>
          </Fragment>
            :
            <Fragment>
              <SignUpForm handleLogin={this.handleLogin}/>
              <LoginForm handleLogin={this.handleLogin} />
            </Fragment>
        }

      </div>
    );
  }
}

export default App;
