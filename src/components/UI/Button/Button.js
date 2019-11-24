import React from 'react';
import cssCls from './Button.css';

const Button = props => {
    const clsByButton = [
        cssCls.Button,
        cssCls[props.type]
    ];

    return(
        <button
            onClick={props.onClick}
            className={clsByButton.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;