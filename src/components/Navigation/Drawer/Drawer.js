import React, {Component} from 'react';
import cssCls from './Drawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import {NavLink} from 'react-router-dom';

const links = [
    {to: '/', label: 'Список', exact: true},
    {to: '/auth', label: 'Авторизация', exact: false},
    {to: '/quiz-creator', label: 'Создать тест', exact: false},
];

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose();
    };

    renderLinks() {
        return links.map((link, index) => {
            return (
              <li key={index}>
                  <NavLink
                    to={link.to}
                    exact={link.exact}
                    activeClassName={cssCls.active}
                    onClick={this.clickHandler}
                  >
                      {link.label}
                  </NavLink>
              </li>
            );
        })
    }

    render() {
        const menuIsOpen = this.props.isOpen;
        const clsByNav = [cssCls.Drawer];
        if (!menuIsOpen) {
            clsByNav.push(cssCls.close);
        }

        return (
            <>
                <nav className={clsByNav.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                { menuIsOpen ? <BackDrop onClick={this.props.onClose}/> : null }
            </>
        );
    }
}

export default Drawer;