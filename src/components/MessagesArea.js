import React from 'react';
import NewMessageForm from './NewMessageForm';

const MessagesArea = ({ conversation: {id, title, messages }, user_id }) => {
  return (
    <div className="MessagesArea">
      <h2>{title}</h2>
      <ul>{orderedMessages(messages)}</ul>
      <NewMessageForm conversation_id={id} user_id={user_id} />
    </div>
  )
}

export default MessagesArea;

const orderedMessages = (messages) => {
  const sortedMessages = messages.sort(
    (a,b) => new Date(a.created_at) - new Date(b.created_at)
  )
  return sortedMessages.map(message => {
    return <li key={message.id}>{message.user_name} : {message.text}</li>
  })
}
