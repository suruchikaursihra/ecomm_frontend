/**
 * @author Suruchi kaur sihra
 * @file Spinner Component
 * @flow
 */
import React, { Component } from 'react';
import { spinnerService } from '../services/spinner.service';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner';

class SpinnerComponent extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: this.props.hasOwnProperty('show') ? this.props.show : false,
      loaderMessage: ''
    }
    this.spinnerService = spinnerService;
    this.spinnerService._register(this);
  }

  componentUnmount() {
    this.spinnerService._unregister(this);
  }

  /**
   * @description This is a getter function for the value of name variable.
   */
  get name() {
    return this.props.name;
  }

  /**
   * @description This is a getter function for the value of group variable.
   */
  get group() {
    return this.props.group;
  }

  /**
   * @description This is a getter function for the value of show variable.
   */
  get show() {
    return this.state.show;
  }

  /**
   * @description This is a getter function for the value of msg variable.
   */
  get msg() {
    return this.msg;
  }

  /**
   * @description This function sets the value of spinner message
   */
  set msg(loaderMessage) {
    this.setState({ loaderMessage });
  }

  /**
   * @description This function sets the value of show.
   */
  set show(show) {
    this.setState({ show });
  }

  render() {
    const { show, loaderMessage } = this.state;
    if (show) {
      return (
        <div className="loaderContainer">
          <Loader
            type={this.props.name}
            color="#4285f4"
            height={75}
            width={75}
          />
          <div>
            {loaderMessage}
          </div>
        </div>
      );
    }
    return <React.Fragment />;
  }
}

export default SpinnerComponent;