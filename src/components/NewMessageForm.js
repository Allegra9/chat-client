import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewMessageForm extends React.Component {

  state={
    text: '',
    conversation_id: this.props.conversation_id
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ conversation_id: nextProps.conversation_id })
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value }, console.log("messageform", this.state))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    })
    this.setState({ text: '' })
  }

  render () {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit} >
          <label>New message:</label>
          <br/>
          <input type="text" value={this.state.text}
            onChange={this.handleChange} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default NewMessageForm;
