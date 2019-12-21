import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './HOC/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";

function App() {
  return (
    <Layout>
        <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/quiz-creator" component={QuizCreator} />
            {/*<Route path="/quiz/:id/edit" component={QuizEditor}/>*/}
            <Route path="/quiz/:id" component={Quiz} />
            <Route path="/" component={QuizList} />
        </Switch>
    </Layout>
  );
}

export default App;
