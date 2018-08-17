import React, {Component} from 'react'

import {createUser} from '../../adapter/api'

class SignUpForm extends Component {

  state = {
    username: "",
    password: "",
    name:""
  }

  //Send create request
  handleSubmit = (event) => {
    event.preventDefault();
    createUser(this.state)
    .then(resp => this.props.handleLogin(resp)) //REDIRECT TO CONVERSATIONS
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
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" placeholder="username" onChange={this.handleChange} />
          <input type="text" name="name" placeholder="name" onChange={this.handleChange} />
          <input type="password" name="password" onChange={this.handleChange} />
          <button type="submit"> submit </button>
        </form>
      </div>
    )
  }

}

export default SignUpForm
