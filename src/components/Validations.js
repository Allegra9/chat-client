import React from 'react'

const validations = (input) => {

  //console.log(input)

  let errors = []

  if (!input) {
    errors.push('*Input cannot be empty')
  }

  if (input.length > 10) {
    errors.push('*Input has to be less than 10 chars')
  }

  return errors
}

export default validations
