import React, { Component, Fragment } from 'react';
// import './App.css'; <-- commented out for styling
import ConversationsList from './components/ConversationsList';

import SignUpForm from './components/user/SignUpForm'
import SignIn from './components/user/Signin'
// import LoginForm from './components/user/LoginForm'

import Button from '@material-ui/core/Button';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme';

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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
              <Grid item xs={12}>
                <Paper className="paper">
                  <h1>
                    WELCOME {this.state.active_user.name}
                  </h1>
                  <Button color="primary" onClick={this.handleLogout}>LOGOUT</Button>
                </Paper>
              </Grid>


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
