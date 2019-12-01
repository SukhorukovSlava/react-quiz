import React from 'react';
import cssCls from './QuizList.css';
import {NavLink} from "react-router-dom";

const renderQuizes = () => {
    return [1,2,3].map((quiz, index) => {
        return (
            <li
                key={index}
            >
                <NavLink to={'/quiz/' + quiz}>
                    Тест {quiz}
                </NavLink>
            </li>
        );
    })
};

const QuizList = props => {
    return(
        <div className={cssCls.quizList}>
            <div>
                <h1>Список тестов</h1>
                <ul>
                    {
                        renderQuizes()
                    }
                </ul>
            </div>
        </div>
    );
};

export default QuizList;