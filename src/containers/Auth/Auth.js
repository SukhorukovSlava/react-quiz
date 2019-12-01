import React, {useState} from 'react';
import cssCls from './Auth.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js';

const Auth = () => {
    const initState = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        },
    };
    const [state, setState] = useState(initState);

    const onChangeHandler = (event, controlName) => {
        const curState = {...state};
        const control = {...curState.formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = validatingControl(control.value, control.validation);
        curState.formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(curState.formControls).forEach(name => {
           isFormValid = curState.formControls[name].valid && isFormValid;
        });
        curState.isFormValid = isFormValid;

        setState(curState);
    };

    const validatingControl = (value, validationParams) => {
        if (!validationParams) {
            return true;
        }

        let isValid = true;
        if (validationParams.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validationParams.email) {
            isValid = is.email(value) && isValid;
        }

        if (validationParams.minLength) {
            isValid = value.length >= validationParams.minLength && isValid;
        }

        return isValid;
    };

    const renderInputs = () => {
        return Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => onChangeHandler(event, controlName)}
                />
            );
        });
    };

    const loginHandler = () => {

    };

    const registerHandler = () => {

    };

    return (
        <div className={cssCls.Auth}>
            <div>
                <h1>Авторизация</h1>
                <form
                    className={cssCls.AuthForm}
                    onSubmit={event => event.preventDefault()}
                >
                    {renderInputs()}
                    <Button
                        type="success"
                        onClick={loginHandler}
                        disabled={!state.isFormValid}
                    >
                        Войти
                    </Button>
                    <Button
                        type="primary"
                        onClick={registerHandler}
                        disabled={!state.isFormValid}
                    >
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Auth;