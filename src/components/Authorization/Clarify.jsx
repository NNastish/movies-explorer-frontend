import React, { useEffect, useState } from 'react';
import {Link, useLocation} from "react-router-dom";
import { CLARIFY_REGISTER, CLARIFY_LOGIN } from "../../utils/constants";

const Clarify = () => {
    const [state, setState] = useState({
        question: '',
        action: '',
        linkTo: ''
    });
    const location = useLocation();

    const determineAction = () => {
        const pathName = location.pathname;
        const endPoint = pathName.substr(pathName.lastIndexOf('/'));
        if (endPoint === '/signin') {
            setState(CLARIFY_REGISTER);
        } else {
            setState(CLARIFY_LOGIN);
        }
    }

    useEffect(() => {
        determineAction();
    }, [location]);


    return (
        <div className={'auth__box'}>
            <p className='auth__text'>{state.question}</p>
            <Link to={state.linkTo}><p className='auth__link'>{state.action}</p></Link>
        </div>
    );
};

export default Clarify;
