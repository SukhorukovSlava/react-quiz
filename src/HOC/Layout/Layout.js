import React, {Component} from 'react';
import cssCls from './Layout.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

class Layout extends Component {

    state = {
      menu: false
    };

    toggleMenuHandler = () => {
        this.setState({
           menu: !this.state.menu
        });
    };

    closingMenuThenClickBackdropHandler = () => {
        this.setState({
            menu: false
        });
    };

    render() {
        const children = this.props.children;
        return(
            <div className={cssCls.Layout}>

                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.closingMenuThenClickBackdropHandler}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                    {children}
                </main>
            </div>
        );
    }
}

export default Layout;