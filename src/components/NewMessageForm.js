import React from 'react';
import { postMessage } from '../adapter/api';

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

// import Emoji from 'react-emoji-render';
// import emojiDictionary from 'emoji-dictionary';
// import EmojiPicker from 'emoji-picker-react';
//
// import JSEMOJI from 'emoji-js';
//
// // new instance
// const jsemoji = new JSEMOJI();
// // set the style to emojione (default - apple)
// jsemoji.img_set = 'emojione';
// // set the storage location for all emojis
// jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';
//
// // some more settings...
// jsemoji.supports_css = false;
// jsemoji.allow_native = false;
// jsemoji.replace_mode = 'unified';

class NewMessageForm extends React.Component {

  state={
    text: '',
    conversation_id: this.props.conversation_id,
    user_id: this.props.user_id,
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      conversation_id: nextProps.conversation_id,
      user_id: nextProps.user_id
    })
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    postMessage(this.state)
    this.setState({ text: '' })
  }

  // onEmojiClick = (code, emoji) => {
  //   console.log(code, emoji)
  //   //let emojiPic = jsemoji.replace_colons(`:${emoji.name}:`);
  //   let emojiCode = jsemoji.replace_unified(code);
  //   let emojiPic = String.fromCodePoint(`0x${emojiCode}`)
  //   this.setState({
  //     text: this.state.text + emojiPic
  //   })
  // }

  //jsemoji.replace_colons(`:${emojiName}:`);

  addEmoji = (e) => {
    console.log(e)
  }

  render () {
     const styles = {
       container: {
         padding: 20,
         borderTop: '1px #4C758F solid',
         marginBottom: 20,
       },
       form: {
         display: 'flex',
       },
       input: {
         color: 'inherit',
         background: 'none',
         outline: 'none',
         border: 'none',
         flex: 1,
         fontSize: 16,
       },
     }

    return (
      <div style={styles.container} className="newMessageForm">
        <form style={styles.form} onSubmit={this.handleSubmit} >

          <input style={styles.input} type="text" value={this.state.text}
            onChange={this.handleChange}
            placeholder="Type a message here then hit ENTER"
          />

    



      </form>
      </div>
    )
  }
}

export default NewMessageForm;

//   <Picker onSelect={this.handleEmojiClick} />

 //  <EmojiPicker onEmojiClick={this.onEmojiClick} />
