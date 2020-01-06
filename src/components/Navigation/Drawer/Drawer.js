import React from 'react';
import cssCls from './Drawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import {NavLink} from 'react-router-dom';

const links = [
    {to: '/', label: 'List', exact: true},
    {to: '/auth', label: 'Authorization', exact: false},
    {to: '/quiz-creator', label: 'Create a test', exact: false},
];

const Drawer = props => {

    const renderLinks = () => links.map((link, index) => {
        return (
            <li key={index}>
                <NavLink
                    to={link.to}
                    exact={link.exact}
                    activeClassName={cssCls.active}
                    onClick={() => props.onClose()}
                >
                    {link.label}
                </NavLink>
            </li>
        );
    });

    const menuIsOpen = props.isOpen;
    const clsByNav = [cssCls.Drawer];

    if (!menuIsOpen) {
        clsByNav.push(cssCls.close);
    }

    return (
        <>
            <nav className={clsByNav.join(' ')}>
                <ul>
                    {renderLinks()}
                </ul>
            </nav>
            { menuIsOpen ? <BackDrop onClick={props.onClose}/> : null }
        </>
    );
};

export default Drawer;