import React from 'react';
import NewMessageForm from './NewMessageForm';

const styles = {
       container: {
         overflowY: 'scroll',
         flex: 1,
       },
       ul: {
         listStyle: 'none',
       },
       li: {
         marginTop: 13,
         marginBottom: 13,
       },
       senderUsername: {
         fontWeight: 'bold',
       },
       message: {
         fontSize: 15
       },
     }

const MessagesArea = ({ conversation: {id, title, messages }, user_id }) => {
  return (
    <div>
      <div style={styles.container} className="MessagesArea">
        <h2> #{title}</h2>
        <ul style={styles.ul} >
          {orderedMessages(messages)}
        </ul>
      </div>
      <div>
        <NewMessageForm conversation_id={id} user_id={user_id} />
      </div>
    </div>
  )
}

export default MessagesArea;

const orderedMessages = (messages) => {
  const sortedMessages = messages.sort(
    (a,b) => new Date(a.created_at) - new Date(b.created_at)
  )

  //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

//console.log(today.toLocaleDateString("en-US")); // 9/17/2016
//console.log(a.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016

  return sortedMessages.map(message => {
    return (
      <div>
        <span style={styles.senderUsername} key={message.id} >{message.user_name}: </span>
          <span> {message.created_at} </span>
        <li style={styles.li}>{message.text}</li>
      </div>
    )
  })
}
