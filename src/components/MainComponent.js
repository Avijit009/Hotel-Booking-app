import React, { Component } from "react";
import Header from "./header/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import { authCheck } from "../redux/authActionCreators";
import Hotels from "./hotels/Hotels";
import AuthForm from "./authentication/AuthForm";
import Homepage from "./home/Homepage";
import Logout from "./authentication/Logout";
// import yourBooking from './booking/yourBooking';

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: () => dispatch(authCheck()),
  };
};

class MainComponent extends Component {
  componentDidMount() {
    this.props.authCheck();
  }
  render() {
    let routes = null;
    if (this.props.auth.token === null) {
      routes = (
        <Routes>
          <Route path="/login" element={<AuthForm />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      );
    } else {
      routes = (
        <div>
          <Routes>
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/booking" element={<Homepage/>} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </div>
      );
    }

    return (
      <div>
        <div className="">
          <Header />
          {routes}
        </div>
      </div>
    );
  }
}

//export default MainComponent;

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
