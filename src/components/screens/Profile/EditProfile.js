import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UserForm } from '../../widgets';

import { updateCurrentUser } from '../../../store/actions';

class EditProfile extends Component {

  state = {
    user: null,
  };

  handleSubmit(user) {
    this.props.onSave(user)
      .then(() => this.props.navigation.goBack());
  }

  render() {
    return (<UserForm currentUser={this.props.currentUser} isEditionMode={true} onSubmit={(user) => this.handleSubmit(user)} />);
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSave: (user) => dispatch(updateCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);