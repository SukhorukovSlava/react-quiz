import React, {Component} from 'react';
import cssCls from './Layout.css';


class Layout extends Component {
    render() {
        const children = this.props.children;
        return(
            <div className={cssCls.Layout}>
                <main>
                    {children}
                </main>
            </div>
        );
    }
}

export default Layout;