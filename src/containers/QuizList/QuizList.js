import React, {useEffect} from 'react';
import {connect} from "react-redux";
import cssCls from './QuizList.css';
import {NavLink} from "react-router-dom";
import Loader from '../../components/UI/Loader/Loader';
import {fetchQuizes} from "../../store/actions/quiz";

const QuizList = props => {

    useEffect(() => {
        props.fetchQuizes();
    }, []);

    return(
        <div className={cssCls.quizList}>
            <div>
                <h1>List of tests</h1>
                {
                    props.loading && props.quizes.length === 0
                    ? <Loader/>
                    : <ul>{renderQuizes(props.quizes)}</ul>
                }
            </div>
        </div>
    );
};

const renderQuizes = quizes => {
    return quizes.map(quiz => {
        return (
            <li
                key={quiz.id}
            >
                <NavLink to={`/quiz/${quiz.id}`}>
                    {quiz.name}
                </NavLink>
            </li>
        );
    })
};

const mapStateToProps = state => {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);