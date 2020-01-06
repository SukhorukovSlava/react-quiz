import React from 'react';
import cssCls from './Quiz.css';
import axios from '../../axios/axios-quiz';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from  '../../components/FinishedQuiz/FinishedQuiz';
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends React.Component {

    state = {
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
        quiz: [],
        loading: true
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    checkingCorrectAnswer() {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return true;
            }
        }
        return false;
    }

    onAnswerClickHandler = (answerId) => {
        if (this.checkingCorrectAnswer()) {
            return;
        }

        const {activeQuestion, results} = this.state;
        const question = this.state.quiz[activeQuestion];

        if (parseInt(question.rightAnswerId) === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    });
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout);
            }, 1000);
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            });
        }
    };

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        });
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`quiz/${this.props.match.params.id}.json`);
            const quiz = response.data;
            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {
            console.error(e);
        }
    }


    render() {
        const {activeQuestion, isFinished, results, quiz, loading} = this.state;

        return(
            <div className={cssCls.Quiz}>
                <div className={cssCls.QuizWrapper}>
                    <h1>Answer all questions</h1>
                    {
                        (loading)
                            ? <Loader/>
                            : (isFinished)
                                ? <FinishedQuiz
                                    results={results}
                                    quiz={quiz}
                                    onRetry={this.retryHandler}
                                />
                                : <ActiveQuiz
                                    question={this.state.quiz[activeQuestion].question}
                                    answers={this.state.quiz[activeQuestion].answers}
                                    totalCountQuiz={this.state.quiz.length}
                                    curNumQuestion={this.state.activeQuestion + 1}
                                    answerState={this.state.answerState}
                                    onAnswerClick={this.onAnswerClickHandler}
                                />
                    }
                </div>
            </div>
        );
    }
}

export default Quiz;