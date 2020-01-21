import React, {useState} from 'react';
import cssCls from './Layout.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import connect from "react-redux/es/connect/connect";

const Layout = props => {

  const [state, setState] = useState({menu: false});

  const closingMenuThenClickBackdropHandler = () => {
    setState({
      menu: false
    });
  };

  const toggleMenuHandler = () => {
    setState({
      menu: !state.menu
    });
  };

  const children = props.children;

  return (
    <div className={cssCls.Layout}>

      <Drawer
        isOpen={state.menu}
        isAuthenticated={props.isAuthenticated}
        onClose={closingMenuThenClickBackdropHandler}
      />
      <MenuToggle
        onToggle={toggleMenuHandler}
        isOpen={state.menu}
      />
      <main>
        {children}
      </main>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
};

export default connect(mapStateToProps)(Layout);