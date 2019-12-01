import React, {Component} from 'react';
import cssCls from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from  '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null, //{[id]: 'success' or 'error'}
        isFinished: false,
        results: {}, //{[id]: 'success' or 'error'}
        quiz: [
            {
                id: 1,
                question: 'Какого цвета черное море?',
                rightAnswerId: 3,
                answers: [
                    {id: 1, text: 'Зеленое'},
                    {id: 2, text: 'Черное'},
                    {id: 3, text: 'Синее'},
                    {id: 4, text: 'Белое'}
                ]
            },
            {
                id: 2,
                question: 'Сколько цветов в радуге?',
                rightAnswerId: 1,
                answers: [
                    {id: 1, text: '8'},
                    {id: 2, text: '7'},
                    {id: 3, text: '5'},
                    {id: 4, text: '12'}
                ]
            },
        ]
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    checkCorrectnessAnswer() {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return true;
            }
        }
        return false;
    }

    onAnswerClickHandler = (answerId) => {
        if (this.checkCorrectnessAnswer()) {
            return;
        }

        let activeQuestion = this.state.activeQuestion;
        const question = this.state.quiz[activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {
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

    componentDidMount() {
        console.log('Quiz id =', this.props.match.params.id );
    }


    render() {
        let activeQuestion = this.state.activeQuestion;
        const answers = this.state.quiz[activeQuestion].answers;
        const question = this.state.quiz[activeQuestion].question;
        const totalCountQuiz = this.state.quiz.length;
        const curNumQuestion = this.state.activeQuestion + 1;
        const answerState = this.state.answerState;
        const isFinished = this.state.isFinished;
        const results = this.state.results;
        const quiz = this.state.quiz;

        return(
            <div className={cssCls.Quiz}>
                <div className={cssCls.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        (isFinished)
                            ? <FinishedQuiz
                                results={results}
                                quiz={quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                question={question}
                                answers={answers}
                                totalCountQuiz={totalCountQuiz}
                                curNumQuestion={curNumQuestion}
                                answerState={answerState}
                                onAnswerClick={this.onAnswerClickHandler}
                            />
                    }
                </div>
            </div>
        );
    }
}

export default Quiz;