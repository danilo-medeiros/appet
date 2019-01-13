import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AdForm } from '../../widgets';
import { updateAd } from '../../../store/actions';

class EditAd extends Component {
  onSave(ad, image) {
    this.props.onSave(ad, image).then(() => this.props.navigation.goBack());
  }

  render() {
    return (
      <AdForm
        ad={this.props.ad}
        onSave={(ad, image) => {
          this.onSave(ad, image);
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  currentUser: state.users.currentUser,
  ad: state.ads.selectedAd,
});

const mapDispatchToProps = dispatch => ({
  onSave: (ad, image) => dispatch(updateAd(ad, image)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditAd);
