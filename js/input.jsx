import React from 'react';

const Input = (props) => {
  return (
    <input
      name='response'
      value={ props.value }
      onChange={ props.onChange }
    />
  );
};

export default Input;
