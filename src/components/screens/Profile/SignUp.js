import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserForm } from '../../widgets';

import { setCurrentUser } from '../../../store/actions';

class SignUp extends Component {

  handleSubmit(value) {
    const user = {
      ...value,
      id: Math.round(Math.random() * 100),
    }
    this.props.onSave(user);
    this.props.navigation.navigate('ProfileDetails');
  }

  render() {
    return (
      <UserForm currentUser={this.props.currentUser} onSubmit={(value) => this.handleSubmit(value)} />
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSave: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);