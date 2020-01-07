import React from 'react';
import cssCls from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from  '../../components/FinishedQuiz/FinishedQuiz';
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {
    answerClickHandler,
    fetchQuizById,
    retryQuiz,
} from "../../store/actions/quiz";

class Quiz extends React.Component {

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    render() {
        const {isFinished, results, quiz, loading} = this.props;

        return(
            <div className={cssCls.Quiz}>
                <div className={cssCls.QuizWrapper}>
                    <h1>Answer all questions</h1>
                    {
                        (loading || !quiz)
                            ? <Loader/>
                            : (isFinished)
                                ? <FinishedQuiz
                                    results={results}
                                    quiz={quiz}
                                    onRetry={this.props.retryQuiz}
                                />
                                : <ActiveQuiz
                                    question={this.props.quiz[this.props.activeQuestion].question}
                                    answers={this.props.quiz[this.props.activeQuestion].answers}
                                    totalCountQuestion={this.props.quiz.length}
                                    nextQuestionNum={this.props.activeQuestion + 1}
                                    answerState={this.props.answerState}
                                    onAnswerClick={this.props.answerClickHandler}
                                />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        isFinished: state.quiz.isFinished,
        results: state.quiz.results,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        answerClickHandler: answerId => dispatch(answerClickHandler(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);