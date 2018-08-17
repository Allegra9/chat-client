import React, {Component} from 'react'

import {loginUser} from '../../adapter/api'


class LoginForm extends Component {

  state = {
    username: "",
    password: ""
  }

  //Send login reqeust and redirect
  handeSubmit = (event) => {
    event.preventDefault();
    loginUser(this.state)
    .then(resp => console.log("LOGIN USER", resp)) //REDIRECT TO CONVERSATIONS
    //Fetch request to sessionscontroller as POST
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]  : event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" name="username" onChange={this.handleChange} />
          <input type="password" name="password" onChange={this.handleChange} />
          <input type="submit" />
        </form>
      </div>
    );
  }

}

export default LoginForm
