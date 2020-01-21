import React from 'react';
import cssCls from './Drawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import {NavLink} from 'react-router-dom';

const Drawer = props => {

  const renderLinks = links => links.map((link, index) => {
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

  const links = [
    {to: '/', label: 'List', exact: true},
  ];

  if (props.isAuthenticated) {
    links.push({to: '/quiz-creator', label: 'Create a test', exact: false});
    links.push({to: '/quiz-editor', label: 'Edit tests', exact: false});
    links.push({to: '/logout', label: 'Exit', exact: false});
  } else {
    links.push({to: '/auth', label: 'Authorization', exact: false});
  }

  return (
    <>
      <nav className={clsByNav.join(' ')}>
        <ul>
          {renderLinks(links)}
        </ul>
      </nav>
      {menuIsOpen ? <BackDrop onClick={props.onClose}/> : null}
    </>
  );
};

export default Drawer;