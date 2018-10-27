import React from 'react';
import { createConversation } from '../adapter/api';
import validate from './validations'

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class NewConversationForm extends React.Component {

  state={
    title: '',
    errors: []
  }

  handleChange = (e) => {
    let validation = validate(e.target.value)
    this.setState({
      title: e.target.value,
      errors: validation
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let validation = validate(this.state.title)
    if (validation.length === 0){
      createConversation(this.props.userId,this.state)
      this.setState({ title: '' })
    }else {
      this.setState({
        errors: validation
      })
    }
  }

  render() {

    let errors = this.state.errors.map(err => <p>{err}</p> )

    return (
      <div style={styles.container} className="newConversationForm">
        <form onSubmit={this.handleSubmit} >
          <input
            style={styles.input}
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Create a channel"
          />
        <div style={{"color": "red"}}>{errors}</div>
          <Button
            onClick={this.handleSubmit}
            mini
            variant="fab"
            color="primary"
            aria-label="Add"
            className="button"
          >
            <AddIcon />
          </Button>
        </form>
      </div>
    )
  }
}

export default NewConversationForm

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
