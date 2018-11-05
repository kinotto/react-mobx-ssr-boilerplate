/* @flow */
import React from 'react';

type Props = { className?: string };
const Input = (props: Props) => (
  <input 
    {...props}
    className={`input ${props.className || ""}`}
  />
)

export default Input;