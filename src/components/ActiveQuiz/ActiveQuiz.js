import React from 'react';
import cssCls from './ActiveQuiz.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => (
    <div className={cssCls.ActiveQuiz}>
        <p className={cssCls.Question}>
            <span>
                <strong>{ props.nextQuestionNum }.</strong>&nbsp;
                {props.question}
            </span>
            <small>{ props.nextQuestionNum } of { props.totalCountQuestion }</small>
        </p>

        <AnswersList
            answerState={props.answerState}
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
);

export default ActiveQuiz;