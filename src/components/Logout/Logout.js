import React, {useEffect} from 'react';
import connect from "react-redux/es/connect/connect";
import {logout} from "../../store/actions/auth";
import {Redirect} from "react-router-dom";


const Logout = props => {

  const {fnLogout} = props;

  useEffect(() => {
    fnLogout();
  }, [fnLogout]);

  return (
    <Redirect to={'/'}/>
  )
};

const mapDispatchToProps = dispatch => {
  return {
    fnLogout: () => dispatch(logout())
  }
};

export default connect(null, mapDispatchToProps)(Logout);
