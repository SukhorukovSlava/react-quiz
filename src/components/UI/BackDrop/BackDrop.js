import React from 'react';
import clsCss from './BackDrop.css';

const BackDrop = props => <div className={clsCss.BackDrop} onClick={props.onClick}/>;

export default BackDrop;