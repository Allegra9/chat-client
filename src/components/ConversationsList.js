import React, {Fragment} from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { getConversations, getAllConversations, subscribeUser } from '../adapter/api';

import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

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
        this.setState({conversations: conversations})
    })
      getAllConversations()
        .then(allConversations => {
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
    if(e.target.value) {
      subscribeUser(parseInt(e.target.value), this.state.user_id)
        .then(resp => {
          if(!resp.error) {
            this.setState({
            conversations: [...this.state.conversations, resp]
          })
        } else {
          console.log(resp.error)
        }
      }
      )

    }
  }

  handleReceivedConversation = (response) => {
    const { conversation } = response;
      this.setState({
        conversations: [...this.state.conversations, conversation],
        allConversations: [...this.state.allConversations, conversation]
      });
  };

  handleReceivedMessage = (response) => {

    const {message} = response
    const conversations = [...this.state.conversations]

    switch(response.type) {

      case "ADDING_USER":
        const new_message = {
          text: `${response.new_user.name} has joined the channel`,
          id: "ADMIN",
          user_name: "CHANNEL BOT",
          created_at: Date.now()
        }
        const active_conversation = conversations.find(
          conversation => {
            if(parseInt(conversation.id) === parseInt(response.conversation.id)) {
              return true
            }
          }
        )
        active_conversation.messages = [...active_conversation.messages, new_message]
        this.setState({ conversations })
      break;

      default:
        const conversation = conversations.find(
          conversation => {
            if(parseInt(conversation.id) === parseInt(message.conversation_id)) {
              return true
            }
          }
        )

        conversation.messages = [...conversation.messages, message]
        this.setState({ conversations })
        break;
    }
  }

  render = () => {
    const {classes} = this.props
    console.log(classes)
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
         <FormControl className="formControl">
          <Select onChange={this.handleOptionSelect} >
            {
              this.state.allConversations.map(conversation => {
              return <MenuItem value={conversation.id} id={conversation.id}> {conversation.title} </MenuItem>
            })
            }
          </Select>
        </FormControl>

        <List component="nav">
          {
            mapConversations(conversations, this.handleClick)
          }
        </List>
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
        <ListItem button>
          <ListItemText primary={conversation.title} onClick={() => handleClick(conversation.id)}/>
        </ListItem>
    )
  })
}
