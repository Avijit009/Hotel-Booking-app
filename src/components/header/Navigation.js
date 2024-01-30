import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavbarToggler, Collapse, Navbar, NavbarBrand } from "reactstrap";
import Logo from "./Logo";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

class Navigation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
        }
    }

    navToggle = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    render() {
        return (
            <div>
                <Navbar fixed="top" light color="light" expand="sm">
                    <div className="container">
                        <NavbarToggler onClick={this.navToggle} />

                        <Collapse isOpen={this.state.isNavOpen} navbar>
                        <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                            <Logo />
                        </NavbarBrand>
                            <Nav className="mx-auto" navbar>
                                <NavItem>
                                    <Link to="/" className="nav-link">Home</Link>
                                </NavItem>

                                {this.props.auth.userId === null ? 
                                <NavItem>
                                    <Link to="/login" className="nav-link">Login</Link>
                                </NavItem> 
                                : 
                                <> 
                                <NavItem>
                                    <Link to="/hotels" className="nav-link">Hotels</Link>
                                </NavItem>                                 
                                
                                <NavItem>
                                    <Link to="/logout" className="nav-link">Logout</Link>
                                </NavItem>                                
                                <NavItem>
                                    <Link to="/booking" className="nav-link">Your Booking</Link>
                                </NavItem>
                                </>
                                }

                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>

                <br />
                <br />
                <br />
            </div>
        )
    }
}

export default connect(mapStateToProps)(Navigation);