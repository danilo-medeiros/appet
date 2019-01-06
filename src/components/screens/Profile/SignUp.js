import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserForm, UserPassword } from '../../widgets';

import { setCurrentUser } from '../../../store/actions';
import { signUp } from '../../../api';

class SignUp extends Component {

  state = {
    currentForm: 1,
    user: null,
  };

  async saveUser() {
    try {
      const createdUser = await signUp(this.state.user);
      console.log(createdUser);
      this.props.onSave(createdUser);
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
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        password: passwordData.password,
      },
    });
    this.saveUser();
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
  onSave: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);