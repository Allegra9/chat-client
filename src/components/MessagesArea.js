import React from "react";
import NewMessageForm from "./NewMessageForm";

const styles = {
  container: {
    overflowY: "scroll",
    flex: 1
  },
  ul: {
    listStyle: "none"
  },
  li: {
    marginTop: 13,
    marginBottom: 13
  },
  senderUsername: {
    fontWeight: "bold"
  },
  message: {
    fontSize: 15
  },
  date: {
    fontSize: "12px",
    color: "grey",
    fontStyle: "italic",
    fontWeight: 500
  }
};

const MessagesArea = ({
  conversation: { id, title, messages },
  user_id,
  toggleEmojis,
  showEmojis
}) => {
  return (
    <div>
      <div style={styles.container}>
        <h2> #{title}</h2>
        <ul style={styles.ul}>{orderedMessages(messages)}</ul>
      </div>
      <div>
        <NewMessageForm
          conversation_id={id}
          user_id={user_id}
          toggleEmojis={toggleEmojis}
          showEmojis={showEmojis}
        />
      </div>
    </div>
  );
};

export default MessagesArea;

const formatTime = date => {
  // console.log("PREFORMAT: ", date)
  let d = new Date(date);
  //console.log("after format: ", d.toString())
  // console.log("after format: ", d.toDateString())
  // console.log("after format: ", d.toLocaleTimeString().slice(0,5))

  return `${d.toLocaleTimeString().slice(0, 5)} `;
};
const formatDate = date => {
  let d = new Date(date);
  return `${d.toDateString()}`;
};

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  //console.log(today.toLocaleDateString("en-US")); // 9/17/2016
  //console.log(a.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016
  console.log(sortedMessages);

  let today = new Date();
  console.log(String(today).slice(0, 5));
  const messageDates = sortedMessages.map(message =>
    formatDate(message.created_at)
  );
  const uniqueDates = [...new Set(messageDates)];
  console.log(messageDates);
  console.log(uniqueDates[0]);

  return sortedMessages.map(message => {
    return (
      <div>
        <div style={styles.date}>{formatDate(message.created_at)} </div>
        <span style={styles.senderUsername} key={message.id}>
          {message.user_name}{" "}
          <span style={styles.date}>{formatTime(message.created_at)}</span>
        </span>
        <li style={styles.li}>{message.text}</li>
      </div>
    );
  });
};
