import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

class TestModal extends React.Component {
  static propTypes = {
    // This view takes a isLoading property
    isLoading: PropTypes.bool,
  }
  state = {
    isShowingModal: false,
  }
  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})
  render() {
    const {
      props: {
        isLoading,
      },
    } = this;

    return <div>
      <a className="secondary-nav__link" onClick={this.handleClick}>
        User Details
      </a>
      {
        this.state.isShowingModal &&
        <ModalContainer onClose={this.handleClose}>
          {
            isLoading ?
            "loading" :
            <ModalDialog onClose={this.handleClose}>
              <h1>User Details</h1>
              <h1>Username: {this.props.username}</h1>
              <h1>Role: {this.props.role}</h1>
            </ModalDialog>
          }
        </ModalContainer>
      }
    </div>;
  }
}

export default TestModal;
