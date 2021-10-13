import React from 'react';

export default function TechElement({ link, text }) {
  return (
    <li className="techs__box">
      <a
        className="techs_stack"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        {text}
      </a>
    </li>
  );
}
