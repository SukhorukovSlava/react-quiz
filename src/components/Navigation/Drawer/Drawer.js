import React, {Component} from 'react';
import cssCls from './Drawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop';

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