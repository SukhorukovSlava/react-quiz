import React from 'react';
import cssCls from './AnswerItem.css';

const AnswerItem = props => {

    const answerStateCssCls = [cssCls.AnswerItem];

    if (props.answerState) {
        answerStateCssCls.push(cssCls[props.answerState])
    }

    return(
        <li
            className={answerStateCssCls.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            { props.answer.text }
        </li>
    );
};

export default AnswerItem;