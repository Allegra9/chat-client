import React, {Fragment} from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { getConversations } from '../adapter/api';

import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class ConversationsList extends React.Component {

  state={
    conversations: [],
    activeConversation: null,
    user_id: 1,
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     user_id : nextProps.activeUser.id,
  //   })
  // }



componentDidMount() {
  this.setState({
    user_id: this.props.activeUser.id
  }, () => getConversations(this.state.user_id).then(conversations => {
    console.log("Conversations: ", conversations);
    this.setState({conversations: conversations})
  }))
}

  handleClick = (id) => {
    console.log("Active ID: ", id);
    this.setState({ activeConversation: id})
  }

  handleReceivedConversation = (response) => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  handleReceivedMessage = (response) => {
    const {message} = response
    const conversations = [...this.state.conversations]
    const conversation = conversations.find(
      conversation => {
        if(parseInt(conversation.id) === parseInt(message.conversation_id)) {
          return true
        }
      }
    )
    conversation.messages = [...conversation.messages, message]
    this.setState({ conversations })
  }

  render = () => {
    const { conversations, activeConversation } = this.state
    return (
      <Fragment className="conversationsList">
        <ActionCable channel={{ channel: 'ConversationsChannel' }}
          onReceived={this.handleReceivedConversation}
        />

        {
          this.state.conversations.length ?
          (
            <Cable conversations={conversations}
              handleReceivedMessage={this.handleReceivedMessage}
            />
          ) : null
        }

        <Grid item xs={3}>
          <Paper className="paper">
        <h2>Conversations</h2>
        <ul>
          {
            mapConversations(conversations, this.handleClick)
          }
        </ul>
        <NewConversationForm userId={this.state.user_id}/>
          </Paper>
        </Grid>

        {
          activeConversation
            ? (<Grid item="item" xs={9}>
              <Paper className="paper">
                <MessagesArea user_id={this.state.user_id} conversation={findActiveConversation(conversations, activeConversation)}/>
              </Paper>
            </Grid>)
            : null
        }

      </Fragment>
    )
  }
}

export default ConversationsList

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  )
}

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)} >
        {conversation.title}
      </li>
    )
  })
}
