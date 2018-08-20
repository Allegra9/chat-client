import React from 'react';
import { createConversation } from '../adapter/api';

class NewConversationForm extends React.Component {

  state={
    title: ''
  }

  handleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    createConversation(this.props.userId,this.state)
    this.setState({ title: '' })
  }

  render = () => {
    return (
      <div className="newConversationForm">
        <form onSubmit={this.handleSubmit} >
          <label>New Conversation:</label>
          <br/>
            <input type="text" value={this.state.title} onChange={this.handleChange} />
            <input type="submit" />
        </form>
      </div>
    )
  }
}

export default NewConversationForm
