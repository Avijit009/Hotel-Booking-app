import React, { Component } from "react";
import Header from "./header/Header";
import { Route, Routes } from "react-router-dom";
import { connect } from 'react-redux';

import Home from "./home/Home";
import { auth, authCheck } from '../redux/authActionCreators';
import Logout from "./Auth/Logout";
import Hotels from "./Hotels/Hotels";
import AuthForm from './authentication/AuthForm';

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}


class MainComponent extends Component {
    componentDidMount() {
        this.props.authCheck();
    }
    render() {
        let routes = null;
        if (this.props.auth.token === null) {
            routes = (
                <Routes>
                    <Route path="/login" component={AuthForm} />
                    <Route path="/hotels" component = {Hotels}/>
                    <Route path = "/" component={Home} />
                </Routes>
            )
        } else {
            routes = (
                <div>
                    <Routes>
                        <Route path="/hotels" component = {Hotels}/>  
                        <Route path="/logout" component={Logout} />
                        <Route path = "/" component={Home} />
                    </Routes>
                </div>
            )
        }

        return (
            <div>
                <div className="">
                    <Header />
                    {routes}
                </div>
            </div>
        )
    }
}

//export default MainComponent;

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);