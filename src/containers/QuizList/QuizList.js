import React, {useEffect, useState} from 'react';
import cssCls from './QuizList.css';
import {NavLink} from "react-router-dom";
import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios/axios-quiz';

const renderQuizes = quizes => {
    return quizes.map(quiz => {
        return (
            <li
                key={quiz.id}
            >
                <NavLink to={`/quiz/${quiz.id}`}>
                    {quiz.name}
                </NavLink>
                {/*<NavLink to={`/quiz/${quiz.id}/edit`}>*/}
                {/*    <button>Edit</button>*/}
                {/*</NavLink>*/}
            </li>
        );
    })
};

const QuizList = props => {
    const initState = {
        quizes:[],
        loading: true
    };

    const [state, setState] = useState(initState);

    const fetchQuizes = async () => {
        try {
            return await axios.get('/quiz.json');
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchQuizes()
            .then(response => {
                const quizes = [];
                Object.keys(response.data).forEach((key, index) => {
                    quizes.push({
                        id: key,
                        name: `Тест №${index + 1}`
                    })
                });
                setState({quizes, loading: false});
            })
    }, []);

    return(
        <div className={cssCls.quizList}>
            <div>
                <h1>Список тестов</h1>
                {
                    state.loading
                    ? <Loader/>
                    : <ul>{renderQuizes(state.quizes)}</ul>
                }
            </div>
        </div>
    );
};

export default QuizList;