import React from 'react';
import { createConversation } from '../adapter/api';

class NewConversationForm extends React.Component {

  state={
    title: ''
  }

  handleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    createConversation(this.props.userId,this.state)
    this.setState({ title: '' })
  }

  render = () => {
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
      button: {
        borderRadius: '50%',
        background: 'none',
        color: '#fff',
        fontSize: '18px',
        border: '1px solid #fff',
        outline: 'none',
      }
    }

    return (
      <div style={styles.container} className="newConversationForm">
        <form onSubmit={this.handleSubmit} >

            <input style={styles.input} type="text" value={this.state.title}
              onChange={this.handleChange}
              placeholder="Create a channel"
            />
          <button style={styles.button} >+</button>

        </form>
      </div>
    )
  }
}

export default NewConversationForm
