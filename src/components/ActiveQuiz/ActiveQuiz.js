import React from 'react';
import cssCls from './ActiveQuiz.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => (
    <div className={cssCls.ActiveQuiz}>
        <p className={cssCls.Question}>
            <span>
                <strong>{ props.curNumQuestion }.</strong>&nbsp;
                {props.question}
            </span>
            <small>{ props.curNumQuestion } of { props.totalCountQuiz }</small>
        </p>

        <AnswersList
            answerState={props.answerState}
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
);

export default ActiveQuiz;