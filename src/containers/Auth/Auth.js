import React, {useState} from 'react';
import cssCls from './Auth.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js';
import {connect} from "react-redux";
import {signIn, signUp} from "../../store/actions/auth";

const Auth = props => {

  const initState = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Enter the correct email',
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
        label: 'Password',
        errorMessage: 'Enter the correct password',
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
    props.signIn(
      state.formControls.email.value,
      state.formControls.password.value
    );
  };

  const registerHandler = () => {
    props.signUp(
      state.formControls.email.value,
      state.formControls.password.value
    );
  };

  return (
    <div className={cssCls.Auth}>
      <div>
        <h1>Authorization</h1>
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
            Sing in
          </Button>
          <Button
            type="primary"
            onClick={registerHandler}
            disabled={!state.isFormValid}
          >
            Sing up
          </Button>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: (email, password) => dispatch(signIn(email, password)),
    signUp: (email, password) => dispatch(signUp(email, password))
  };
};

export default connect(null, mapDispatchToProps)(Auth);