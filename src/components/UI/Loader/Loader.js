import React from 'react';
import cssCls from './Loader.css';

const Loader = () => (
    <div className={cssCls.center}>
        <div className={cssCls.Loader}>
            <div />
            <div />
        </div>
    </div>
);

export default Loader;