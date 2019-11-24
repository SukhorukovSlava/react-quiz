import React from 'react';
import cssCls from './Button.css';

const Button = props => {
    const cssClasses = [
        cssCls.Button,
        cssCls[props.type]
    ];

    return(
        <button
            onClick={props.onClick}
            className={cssClasses.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;