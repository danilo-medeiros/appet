import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateCurrentUser } from '../../../store/actions';
import { UserForm } from '../../widgets';

class EditProfile extends Component {

  handleSubmit(value) {
    this.props.onUpdate(value);
    this.props.navigation.navigate('ProfileDetails');
  }

  render() {
    return (
      <UserForm currentUser={this.props.currentUser}
        onSubmit={(value) => this.handleSubmit(value)}
        isEditionMode={true}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdate: (user) => dispatch(updateCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);