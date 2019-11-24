import React from 'react';
import cssCls from './MenuToggle.css';

const MenuToggle = props => {
    const clsByIcone = [
        cssCls.MenuToggle,
        'fa'
    ];

    if (props.isOpen) {
        clsByIcone.push('fa-times');
        clsByIcone.push(cssCls.open);
    } else {
        clsByIcone.push('fa-bars');
    }

    return(
        <i
            className={clsByIcone.join(' ')}
            onClick={props.onToggle}
        >
        </i>
    );
};

export default MenuToggle;