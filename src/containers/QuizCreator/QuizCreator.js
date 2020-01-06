import React, {useState} from 'react';
import cssCls from './QuizCreator.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {createControl, validatingControl, validatingForm} from "../../form/ServiceForm";
import axios from 'axios';

function createOptionsControl(num) {
    return createControl({
        id: num,
        label: `Option ${num}`,
        errorMessage: 'option value cannot be empty'
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Enter a question',
            errorMessage: 'question cannot be empty'
        }, {required: true}),
        option1: createOptionsControl(1),
        option2: createOptionsControl(2),
        option3: createOptionsControl(3),
        option4: createOptionsControl(4),
    };
}

const QuizCreator = props => {

    const initState = {
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    };

    const [state, setState] = useState(initState);

    const renderInputs = () => {
        return Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName];

            return (
                <React.Fragment key={controlName + index}>
                    <Input
                        key={index}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validationParams}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => onChangeInputHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </React.Fragment>
            );
        });
    };

    const onChangeInputHandler = (value, controlName) => {
        const curState = {...state};
        const control = {...curState.formControls[controlName]};

        control.value = value;
        control.touched = true;
        control.valid = validatingControl(control.value, control.validationParams);
        curState.formControls[controlName] = control;

        curState.isFormValid = validatingForm(curState.formControls);

        setState(curState);
    };

    const submitFormHandler = event => event.preventDefault();

    const addQuestionHandler = event => {
        event.preventDefault();

        const quiz = [...state.quiz];
        const index = quiz.length + 1;
        const {question, option1, option2, option3, option4} = state.formControls;
        const questionItem = {
            id: index,
            question: question.value,
            rightAnswerId: state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        };
        quiz.push(questionItem);
        setState({
            quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
    };

    const createQuizHandler = async event => {
        event.preventDefault();
        const firebaseUrl = 'https://react-quiz-56e59.firebaseio.com/quiz.json';
        try {
            await axios.post(firebaseUrl, state.quiz);
            setState(initState);
        } catch (e) {
            console.error(e);
        }
    };

    const selectOnChangeHandler = event => {
        const curState = {...state};
        curState.rightAnswerId = event.target.value;
        setState(curState);
    };

    const select = (
        <Select
            label="Choose the correct answer"
            value={state.rightAnswerId}
            onChange={selectOnChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
    );

    return (
        <div className={cssCls.QuizCreator}>
            <div>
                <h1>Creating a test</h1>
                <form onChange={submitFormHandler}>
                    {renderInputs()}

                    {select}

                    <Button
                        type="primary"
                        onClick={addQuestionHandler}
                        disabled={!state.isFormValid}
                    >
                        Add question
                    </Button>
                    <Button
                        type="success"
                        onClick={createQuizHandler}
                        disabled={state.quiz.length === 0}
                    >
                        Create test
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default QuizCreator;