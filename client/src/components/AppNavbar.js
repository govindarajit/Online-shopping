import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem, 
  Container
} from 'reactstrap';
import {
    
    Link
  } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

  class AppNavbar extends Component {
    state = {
      isOpen: false
    };
  
    static propTypes = {
      auth: PropTypes.object.isRequired
    };
  
    toggle = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
    <Container>
                 <div className="container">
                   <li><Link to="/Favorites">Favorites</Link></li>   
    <NavItem>
      <span className='navbar-text mr-2 text-white'>
        <strong>{user ? `Welcome ${user.name}` : ''}</strong>
      </span>
    </NavItem>
    <NavItem>
      <Logout />
    </NavItem>  
        </div>
        </Container>

  </Fragment>
);
    const guestLinks = (
      <Fragment>
    <NavItem>
          <RegisterModal />
        </NavItem>
        
        <NavItem>
          <LoginModal />
        </NavItem>
     
      </Fragment>
    );

    return (
      <div>
<Navbar color='primary' dark expand='sm' className='mb-5'> 
      <Container>
                 <div className="container">
                     <NavbarBrand href='/'>Online Shopping</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                      
              <Nav className='ml-auto' navbar>
            
                {isAuthenticated ? authLinks : guestLinks}
                         
              
              </Nav>
              <ul className="right">

                             <li><Link to="/">Home</Link></li>
                          <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
                      </ul> 
               
            </Collapse>
       </div>
              
              </Container>
              
              </Navbar>
          
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
