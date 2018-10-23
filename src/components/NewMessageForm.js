import React from 'react';
import { postMessage } from '../adapter/api';

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

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
    console.log(this.state)
    postMessage(this.state)
    this.setState({ text: '' })
  }

  addEmoji = (e) => {
    console.log(e.unified)
    let sym = e.unified.split('-')
    let codesArray = []
    sym.forEach(el => codesArray.push('0x' + el))
      //console.log(codesArray)  // ["0x1f3f3", "0xfe0f"]
    let emojiPic = String.fromCodePoint(...codesArray) //("0x1f3f3", "0xfe0f")
    this.setState({
      text: this.state.text + emojiPic
    })
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
       getEmojiButton: {
         cssFloat: "right",
         border: 'none',
         margin: 0,
         cursor: 'pointer',
       },
       xButton: {
         cssFloat: "right",
         margin: 0,
         cursor: 'pointer',
         fontSize: '16px',
         borderRadius: '50%',
         background: 'none',
         border: '1px solid #000',
         outline: 'none',
       },
       emojiPicker: {
        position: "absolute",
        bottom: 10,
        right: 0,
        cssFloat: 'right',
        marginLeft: "200px",

      }
     }

     const customEmojis = [
       {
         name: 'Octocat',
         short_names: ['octocat'],
         text: '',
         emoticons: [],
         keywords: ['github'],
         imageUrl: 'https://assets-cdn.github.com/images/icons/emoji/octocat.png?v7',
       },
     ]

    return (
      <div style={styles.container} className="newMessageForm">
        <form style={styles.form} onSubmit={this.handleSubmit} >
          <input style={styles.input} type="text" value={this.state.text}
            onChange={this.handleChange}
            placeholder="Type a message here then hit ENTER"
          />
        </form>
        {
          this.props.showEmojis ?
            <span>
              <span style={styles.emojiPicker} >
                <Picker onSelect={this.addEmoji} />
              </span>
              <p style={styles.getEmojiButton} onClick={this.props.toggleEmojis} >
                {String.fromCodePoint(0x1f60a)}
              </p>
            </span>
          :
            <p style={styles.getEmojiButton} onClick={this.props.toggleEmojis} >
              {String.fromCodePoint(0x1f60a)}
            </p>
        }
      </div>
    )
  }
}

export default NewMessageForm;
