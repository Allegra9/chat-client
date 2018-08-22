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

import {getCurrentUser} from './adapter/api'

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '80vh',
    maxHeight: '80vh',
    overflow:"hidden"
  },
  childGrid: {
    minHeight: '80vh',
    maxHeight: '80vh',
    overflow:"hidden"
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class App extends Component {

  state = {
    active_user : undefined
  }

  handleLogin = (response) => { //passed as props to SignIn
    console.log(response);
    localStorage.setItem('token', response.token);
      this.updateCurrentUser(response.token);
  }

  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.updateCurrentUser();
    }
  }

  updateCurrentUser = () => {
    console.log("Attempting to fetch current user...");

    getCurrentUser(localStorage.getItem('token'))
      .then(resp => {
        if(resp.error) {
          this.handleLogout();
        } else {
          this.setState({
            active_user : resp
          })
        }
      })
  }

  handleLogout = () => {
    this.setState({
      active_user : undefined
    })
    localStorage.clear();
  }

  render() {
    return (
      <div className="App">
        {
          this.state.active_user ?
          <Fragment >
            <Grid container="container" className="root" justify="center" alignItems="center" direction="column">
              <Grid container className="childGrid"  >
                <NavBar active_user={this.state.active_user} handleLogout={this.handleLogout}/>
              </Grid>
              <Grid container className="childGrid" >
                <ConversationsList activeUser={this.state.active_user}/>
              </Grid>
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
