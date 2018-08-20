import React, { Component, Fragment } from 'react';

// import './App.css'; <-- commented out for styling
import ConversationsList from './components/ConversationsList';

import SignUpForm from './components/user/SignUpForm'
import SignIn from './components/user/Signin'
// import LoginForm from './components/user/LoginForm'
import NavBar from './components/NavBar'

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: "95vh",
    width: "95vw"
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

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
        {
          this.state.active_user ?
          <Fragment >
            <Grid container="container" className="root" justify="center" alignItems="center" direction="row">
              <NavBar active_user={this.state.active_user} handleLogout={this.handleLogout}/>

              <ConversationsList activeUser={this.state.active_user}/>

            </Grid>
          </Fragment>
            :
            <Fragment>
              {//<SignUpForm handleLogin={this.handleLogin}/>
              }
              <SignIn handleLogin={this.handleLogin} />
            </Fragment>
        }

      </div>
    );
  }
}

export default withStyles(styles)(App);
