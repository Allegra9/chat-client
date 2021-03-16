import React from "react";
import { postMessage } from "../adapter/api";
import validate from "./Validations";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

class NewMessageForm extends React.Component {
  state = {
    text: "",
    conversation_id: this.props.conversation_id,
    user_id: this.props.user_id,
    showEmojis: false,
    errors: []
  };

  showEmojis = e => {
    this.setState(
      {
        showEmojis: true
      },
      () => document.addEventListener("click", this.closeMenu)
    );
  };

  closeMenu = e => {
    console.log(this.emojiPicker);
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
      this.setState(
        {
          showEmojis: false
        },
        () => document.removeEventListener("click", this.closeMenu)
      );
    }
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      conversation_id: nextProps.conversation_id,
      user_id: nextProps.user_id
    });
  };

  handleChange = e => {
    let validation = validate(e.target.value);
    //console.log(validation)
    this.setState({
      text: e.target.value,
      errors: validation
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let validation = validate(this.state.text);
    //console.log(validation)
    if (validation.length === 0) {
      postMessage(this.state);
      this.setState({ text: "" });
    }
    this.setState({
      errors: validation
    });
  };

  addEmoji = e => {
    // console.log(e.native);
    let emoji = e.native;
    this.setState({
      text: this.state.text + emoji
    });
  };

  render() {
    let errors = this.state.errors.map(err => <p>{err}</p>);

    return (
      <div style={styles.container} className="newMessageForm">
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <input
            style={styles.input}
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="Type a message and hit ENTER"
          />
        </form>
        <div style={{ color: "red" }}>{errors}</div>
        {this.state.showEmojis ? (
          <span style={styles.emojiPicker} ref={el => (this.emojiPicker = el)}>
            <Picker
              onSelect={this.addEmoji}
              emojiTooltip={true}
              title="weChat"
            />
          </span>
        ) : (
          <p style={styles.getEmojiButton} onClick={this.showEmojis}>
            {String.fromCodePoint(0x1f60a)}
          </p>
        )}
      </div>
    );
  }
}

export default NewMessageForm;

const styles = {
  container: {
    padding: 20,
    borderTop: "1px #4C758F solid",
    marginBottom: 20
  },
  form: {
    display: "flex"
  },
  input: {
    color: "inherit",
    background: "none",
    outline: "none",
    border: "none",
    flex: 1,
    fontSize: 16
  },
  getEmojiButton: {
    cssFloat: "right",
    border: "none",
    margin: 0,
    cursor: "pointer"
  },
  emojiPicker: {
    position: "absolute",
    bottom: 10,
    right: 0,
    cssFloat: "right",
    marginLeft: "200px"
  }
};

const customEmojis = [
  {
    name: "Octocat",
    short_names: ["octocat"],
    text: "",
    emoticons: [],
    keywords: ["github"],
    imageUrl: "https://assets-cdn.github.com/images/icons/emoji/octocat.png?v7"
  }
];
