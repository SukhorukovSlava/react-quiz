import React from 'react';
import cssCls from './FinishedQuiz.css';
import Button from '../UI/Button/Button';
import {Link} from 'react-router-dom';

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((acc, key) => {
        if (props.results[key] === 'success') {
            acc++;
        }
        return acc;
    }, 0);

    return(
        <div className={cssCls.FinishedQuiz}>
            <ul>
                {
                    props.quiz.map((quizItem, index) => {
                      let cls = [
                          'fa',
                          props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                          cssCls[props.results[quizItem.id]]
                      ];

                      return(
                          <li
                            key={index}
                          >
                              <strong>{index + 1}.</strong>&nbsp;
                              {quizItem.question}
                              <i className={cls.join(' ')} />
                          </li>
                      );
                    })
                }
            </ul>

            <p>Correct {successCount} of {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type="primary">Try again</Button>
                <Link to="/">
                    <Button type="success">Go to test list</Button>
                </Link>
            </div>
        </div>
    );
};

export default FinishedQuiz;