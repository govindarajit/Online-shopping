import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
   Label,
  Input,
  NavLink,
  Alert 
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  constructor() {
    super();

  this.state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    mobile:'',
    msg: null,
    fields: {},
        errors: {}
  }; 
  this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
  this.onSubmit = this.onSubmit.bind(this);

  
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
   
      if (error.id === 'REGISTER_FAIL') {
       
        this.setState({ msg: error.msg.msg });

      } else {
        this.setState({ msg: null });
      }
    }

    // If the user is authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  };



  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
        let fields = {};
        fields["username"] = "";
        fields["emailid"] = "";
        fields["password"] = ""; 
        fields["mobile"] = ""; 
        this.setState({fields:fields});
       

        const { name, email, password,mobile } = this.state;

        // We are creating user object
        const newUser = {
          name,
          email,
          password ,
          mobile
        };
    
        // Attempting to register
        this.props.register(newUser);
    
    }

  }

  onSubmit = e => {
    e.preventDefault();

  };

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Please enter your username.";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["name"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof fields["email"] !== "undefined") {
       
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }

  
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      }
    }

     
    if (!fields["mobile"]) {
      formIsValid = false;
      errors["mobile"] = "*Please enter your mobile no.";
    }

    
    if (typeof fields["mobile"] !== "undefined") {
      if (!fields["mobile"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["mobile"] = "*Please enter valid mobile no.";
      }
    }
    this.setState({
      errors: errors
    });
    return formIsValid;  }

  render() {
    return (
      <div>
  
        <NavLink onClick={this.toggle} className="text-white" href='#'>
          Register
        </NavLink>
         
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="model">
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.submituserRegistrationForm}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  className='mb-3'
                  onChange={this.onChange}
                />
                <div className="errorMsg">{this.state.errors.name}</div>

                <Label for='email'>Email</Label>
                <Input
                  type='text'
                  name='email'
                  id='email'
                  placeholder='Email'
                  className='mb-3'
                  onChange={this.onChange}
                />
              <div className="errorMsg">{this.state.errors.email}</div>
                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='mb-3'
                  onChange={this.onChange}
                /><div className="errorMsg">{this.state.errors.password}</div>
                <Label for='mobile'>Mobile No</Label>
                <Input
                  type='text'
                  name='mobile'
                  id='mobile'
                  placeholder='mobile Number'
                  className='mb-3'
                  onChange={this.onChange}
                /><div className="errorMsg">{this.state.errors.mobile}</div>


                <Button outline color="primary" style={{ marginTop: '2rem' }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);