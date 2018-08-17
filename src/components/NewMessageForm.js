import React from 'react';
import { postMessage } from '../adapter/api';

class NewMessageForm extends React.Component {

  state={
    text: '',
    conversation_id: this.props.conversation_id,
    user_id: this.props.user_id,
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      conversation_id: nextProps.conversation_id,
      user_id: nextProps.user_id
    })
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value }, console.log("messageform", this.state))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    postMessage(this.state)
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
