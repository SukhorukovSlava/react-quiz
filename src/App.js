import React, {useEffect} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Layout from './HOC/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import QuizEditor from "./containers/QuizEditor/QuizEditor";
import connect from "react-redux/es/connect/connect";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

const App = props => {

  const {automaticLogin} = props;

  useEffect(() => {
    automaticLogin();
  }, [automaticLogin]);

  const authRouts = (
    <Switch>
      <Route path="/quiz-creator" component={QuizCreator} />
      <Route path="/quiz-editor" component={QuizEditor}/>
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/logout" component={Logout}/>
      <Route path="/" exect component={QuizList} />
      <Redirect to={'/'} />
    </Switch>
  );

  const notAuthRouts = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/" exect component={QuizList} />
      <Redirect to={'/'} />
    </Switch>
  );

  return (
    <Layout>
      {
        props.isAuthenticated
          ? authRouts
          : notAuthRouts
      }
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    automaticLogin: () => dispatch(autoLogin())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
