import React, {Fragment} from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { getConversations, getAllConversations, subscribeUser } from '../adapter/api';

import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class ConversationsList extends React.Component {

  state={
    conversations: [],
    allConversations: [],
    activeConversation: null,
    user_id: 1,
  }

  componentDidMount() {
    this.setState({
      user_id: this.props.activeUser.id
    }, () => {
      getConversations(this.state.user_id).then(conversations => {
      console.log("Conversations: ", conversations);
      this.setState({conversations: conversations})
    })
      getAllConversations()
        .then(allConversations => {
        console.log("All Conversations: ", allConversations);
        this.setState({allConversations: allConversations})
      })
    })
  }

  handleClick = (id) => {
    console.log("Active ID: ", id);
    this.setState({ activeConversation: id})
  }

  handleOptionSelect = (e) => {
    console.log("SELECTED ID: ", e.target.value)
    subscribeUser(parseInt(e.target.value), this.state.user_id)
      .then(res => console.log(res))
  }

  handleReceivedConversation = (response) => {
    const { conversation } = response;
    if (response.type === "ADDING_USER") {
      console.log("A new user has joined", response.new_user)
      if (this.state.user_id === response.new_user.id) {
        this.handleClick(conversation.id)
        this.setState({
          conversations: [...this.state.conversations, conversation],
        });
      }
    }else {
      this.setState({
        conversations: [...this.state.conversations, conversation],
        allConversations: [...this.state.allConversations, conversation]
      });
    }
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
      <Fragment>
        <ActionCable channel={{ channel: 'ConversationsChannel', conversation_id: this.state.activeConversation }}
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
        <h2>Channels:</h2>
        <p>Search for channels:</p>
          <input id={0} list="browsers" onSelect={this.handleOptionSelect} />
          <datalist id="browsers">
            {
              this.state.allConversations.map(conversation => {
              return <option value={conversation.id} id={conversation.id}> {conversation.title} </option>
            })
            }
          </datalist>

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
