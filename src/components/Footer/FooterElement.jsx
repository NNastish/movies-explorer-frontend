import React from 'react';

const FooterElement = ({ link, name }) => (
  <li>
    <a
      className="footer__link"
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      {name}
    </a>
  </li>
);

export default FooterElement;
