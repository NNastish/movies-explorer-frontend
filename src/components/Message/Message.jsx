import React from 'react';
import './Message.css';

export default function Message({ text, isError }) {
  const textClass = isError ? 'message__error' : 'message__info';
  return (
    <p className={textClass}>
      {text}
    </p>
  );
}
