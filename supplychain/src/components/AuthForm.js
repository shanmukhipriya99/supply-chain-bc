import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import {browserHistory} from 'react-router';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from '../axios';

class AuthForm extends React.Component {
  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    event.preventDefault();
    if(this.isLogin) {
      let login = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      }
      axios.post("/login", login).then(response => {
        if(response.status === 200){
          localStorage.setItem("token", response.data.token);
          // console.log(browserHistory);
          // this.props.history.push("/dashboard");
          // console.log(window.location);
          window.location.href = '/dashboard';
        } 
      })
      .catch(err => {
        console.log(err.response);
       if (err.response.status === 500) {
          alert("Server error, please try again later!");
        } else if (err.response.status === 401) {
          alert("Incorrect credentials!");
          document.location.reload();
        }
      });
      // console.log(login);
    }
    if(this.isSignup) {
      let signup = {
        PName: document.getElementById("PName").value, 
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
      }
      axios.post("/signup", signup).then(response => {
          console.log(response);
          // this.props.history.push("/");
          // console.log(this.props.history);
          window.location.href = '/';
      })
      .catch(err => {
        console.log(err.response);
       if (err.response.status === 500) {
          alert("Server error, please try again later!");
        } else if (err.response.status === 409) {
          alert("Registration failed!");
        }
      });
    }
  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        {this.isSignup && (
          <FormGroup>
            <Label> Name</Label>
            <Input id="PName" placeholder="Your Name" />
          </FormGroup>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input {...usernameInputProps} id="email" required />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input {...passwordInputProps} id="password" />
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label>Occupation</Label>
            <Input type="select" name="select" id="role">
          <option>Farmer</option>
          <option>WholeSaler</option>
          <option>Distributor</option>
          <option>Retailer</option>
          <option>Customer</option>
        </Input>
          </FormGroup>
        )}
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};

export default AuthForm;
