import React, { Component, Fragment } from 'react'

import ConversationsList from './components/ConversationsList'
import SignIn from './components/user/Signin'
import SignUp from './components/user/SignUp'
import NavBar from './components/NavBar'

import { withStyles } from "@material-ui/core/styles"

import {getCurrentUser} from './adapter/api'

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
})

class App extends Component {

  state = {
    active_user : undefined,
    signup: false
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

  toggleSignUp = () => {
    this.setState({
      signup: !this.state.signup
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
          this.state.active_user
          ?
          <Fragment>
              <NavBar
                active_user={this.state.active_user}
                handleLogout={this.handleLogout}
              />
              <ConversationsList
                activeUser={this.state.active_user}
              />
          </Fragment>
            :
            <Fragment>
              {
                this.state.signup
                ?
                   <SignUp
                     handleLogin={this.handleLogin}
                     toggleSignUp={this.toggleSignUp}
                   />
                 : <SignIn
                    handleLogin={this.handleLogin}
                    toggleSignUp={this.toggleSignUp}
                   />
              }
            </Fragment>
        }

      </div>
    )
  }
}

export default withStyles(styles)(App)
