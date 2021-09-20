import React from 'react';

const FooterElement = ({ link, name }) => {
    return (
        <li>
            <a className={'footer__link'}
               href={link}
               target={'_blank'}>{name}</a>
        </li>
    );
};

export default FooterElement;
