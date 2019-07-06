import React from "react";

const validations = input => {
  //console.log(input)

  let errors = [];

  if (!input) {
    errors.push("*Input cannot be empty");
  }

  // if (input && input.length < 2) {
  //   errors.push("*a bit more effort?");
  // }

  return errors;
};

export default validations;
