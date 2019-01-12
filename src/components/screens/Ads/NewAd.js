import React, { Component } from "react";
import { connect } from "react-redux";

import { AdForm } from "../../widgets";

import { insertAd } from "../../../store/actions";

class NewAd extends Component {
  onSave(ad, image) {
    this.props.onSave(ad, image).then(() => this.props.navigation.goBack());
  }

  render() {
    return (
      <AdForm
        onSave={(ad, image) => {
          this.onSave(ad, image);
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  currentUser: state.users.currentUser
});

const mapDispatchToProps = dispatch => ({
  onSave: (ad, image) => dispatch(insertAd(ad, image))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAd);
