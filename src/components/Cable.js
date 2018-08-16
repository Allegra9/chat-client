import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ conversations, handleReceivedMessage }) => {
  return (
    <Fragment>
      {conversations.map(conversation => {
        return (
          <ActionCable key={conversation.id}
            channel={{ channel: "MessagesChannel",
              conversation: conversation.id }}
            onReceived={handleReceivedMessage}
          />
        )
      })}
    </Fragment>
  )
}

export default Cable;
