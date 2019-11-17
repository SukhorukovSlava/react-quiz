import React from 'react';
import cssCls from './AnswersList.css';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = props => (
    <ul className={cssCls.AnswersList}>
        { props.answers.map((answer, index) => {
            return(
              <AnswerItem
                  answerState={props.answerState ? props.answerState[answer.id] : null}
                  key={index}
                  answer={answer}
                  onAnswerClick={props.onAnswerClick}
              />
            );
        }) }
    </ul>
);

export default AnswersList;