import React, {Fragment} from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { getConversations, getAllConversations, subscribeUser } from '../adapter/api';

import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import SimpleSnackbar from './SimpleSnackbar'

// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";

class ConversationsList extends React.Component {

  state={
    conversations: [],
    allConversations: [],
    activeConversation: null,
    user_id: 1,
    snackbarMessage: "",
    showSnackbar: false,
    showEmojis: false,
  }

  toggleEmojis = () => {
    this.setState({
      showEmojis: !this.state.showEmojis
    })
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
    this.setState({
      activeConversation: id,
      showEmojis: false,
    })
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
        this.setState({
          snackbarMessage: `${response.new_user.name} has joined the channel ${response.conversation.title}`,
          showSnackbar : true
        })
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

  toggleSnackbar = () => {
    this.setState({
      showSnackbar: !this.state.showSnackbar
    })
  }

  render = () => {
    const styles = {
      container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingTop : '5em'
      },
      chatContainer: {
        paddingLeft: '20px',
        flex: 'none',
        width: '70%',
        height: '100vh',
        display: 'inline',

        border: '1px solid #000',
        overflowY: 'scroll',
        overflowX: 'scroll',
        paddingBottom: '20px',

      },
      whosOnlineListContainer: {
        width: '25%',
        height: '95vh',
        flex: 'none',
        padding: '20px',
        backgroundColor: '#2c303b',
        color: 'white',
        display: 'inline',
        overflowY: 'scroll',
      },

      li: {
        display: 'flex',
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 2,
        paddingBottom: 2,
      },

      chatListContainer: {
        padding: 0,
        width: '100%',
        display: 'flex',
        //flexDirection: 'column',
        border: '1px solid grey',
      },
      ul: {
        listStyle: 'none',
      },
      channelsSection: {
        margin: '50px 0',
        //border: '1px solid #fff',
      },
    } //styles

    const { conversations, activeConversation } = this.state
    return (
      <div style={styles.container}>
        <ActionCable channel={{ channel: 'ConversationsChannel',
          conversation_id: this.state.activeConversation }}
          onReceived={this.handleReceivedConversation}
        />
        { this.state.conversations.length ?
          (
            <Cable conversations={conversations}
              handleReceivedMessage={this.handleReceivedMessage}
            />
          ) : null
        }
      <div style={styles.chatListContainer} >
        <span style={styles.whosOnlineListContainer} >
          <p>Search for channels:</p>
          <FormControl style={{minWidth: '120px'}}>
            <Select native onChange={this.handleOptionSelect} >
              {
                this.state.allConversations.map(conversation => {
                return <option value={conversation.id} id={conversation.id}>
                        {conversation.title}
                       </option>
              })
              }
            </Select>
          </FormControl>

        <div style={styles.channelsSection}>
          <p>Channels:</p>
          <ul style={styles.ul}>
            {
              mapConversations(conversations, this.handleClick)
            }
          </ul>
        </div>

          <NewConversationForm userId={this.state.user_id}/>
        </span>
        {
          activeConversation
            ? (
              <span style={styles.chatContainer} >
                <MessagesArea user_id={this.state.user_id} toggleEmojis={this.toggleEmojis} showEmojis={this.state.showEmojis}
                  conversation={findActiveConversation(conversations, activeConversation)}/>
              </span>
              )
            : null
        }
      </div>
      <SimpleSnackbar message={this.state.snackbarMessage} open={this.state.showSnackbar} toggleSnackbar={this.toggleSnackbar} />
    </div>
    )
  }
}

export default ConversationsList

const styles={
  li: {
    display: 'flex',
    marginTop: 5,
    marginBottom: 5,
    paddingTop: '1em',
    paddingBottom: 2,
    cursor: 'pointer',
  },
}

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  )
}

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <li style={styles.li} key={Math.random().toString(36).substring(7)} onClick={() => handleClick(conversation.id)} >
        # {conversation.title}
      </li>


    )
  })
}
