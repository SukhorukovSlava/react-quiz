import React, {Component} from 'react';
import cssCls from './Drawer.css';

const links = [1,2,3];

class Drawer extends Component {

    renderLinks() {
        return links.map((link, index) => {
            return (
              <li key={index}>
                  <a>Link {link}</a>
              </li>
            );
        })
    }

    render() {
        const clsByNav = [cssCls.Drawer];
        if (!this.props.isOpen) {
            clsByNav.push(cssCls.close);
        }

        return (
            <nav className={clsByNav.join(' ')}>
                <ul>
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

export default Drawer;