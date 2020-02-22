import React, {useEffect} from 'react';
import cssCls from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {
  answerClickHandler,
  fetchQuizById,
  retryQuiz,
} from "../../store/actions/quiz";

const Quiz = props => {

  const {fetchQuizById, retryQuiz, match} = props;

  useEffect(() => {
    fetchQuizById(match.params.id);
  }, [fetchQuizById, match]);


  useEffect(() => () => {
    retryQuiz();
  }, [retryQuiz]);

  const {isFinished, results, quiz, loading} = props;

  return (
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
              onRetry={props.retryQuiz}
            />
            : <ActiveQuiz
              question={props.quiz[props.activeQuestion].question}
              answers={props.quiz[props.activeQuestion].answers}
              totalCountQuestion={props.quiz.length}
              nextQuestionNum={props.activeQuestion + 1}
              answerState={props.answerState}
              onAnswerClick={props.answerClickHandler}
            />
        }
      </div>
    </div>
  );
};

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