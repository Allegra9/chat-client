import React from 'react'

const Validations = (input) => {

  console.log(input)

    let errors = []

    if (input.length > 10) {
      errors.push('*Message has to be lass than 10 chars')
    }

    if (!input) {
      errors.push('*Message cannot be empty')
    }
    return errors
}

export default Validations
