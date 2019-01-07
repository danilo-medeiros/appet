import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserForm, UserPassword } from '../../widgets';

import { insertUser } from '../../../store/actions';
import { register } from '../../../api';

class SignUp extends Component {

  state = {
    currentForm: 1,
    user: null,
  };

  async saveUser(user) {
    try {
      const signUpResponse = await signUp(user);
      const resgisterResponse = await register(signUpResponse.auth_token);
      this.props.onSave(resgisterResponse);
      this.props.navigation.navigate('ProfileDetails');
    } catch (error) {
      alert(error.message);
    }
  }

  handleUserSubmit(user) {
    this.setState({
      currentForm: 2,
      user,
    });
  }

  handlePasswordSubmit(passwordData) {
    const user = {
      ...this.state.user,
      password: passwordData.password,
    };
    this.props.onSave(user);
  }

  render() {
    if (this.state.currentForm === 1) {
      return (<UserForm onSubmit={(user) => this.handleUserSubmit(user)} />);
    }
    if (this.state.currentForm === 2) {
      return (<UserPassword onSubmit={(passwordData) => this.handlePasswordSubmit(passwordData)} />);
    }
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSave: (user) => dispatch(insertUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);