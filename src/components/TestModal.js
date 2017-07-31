import React, { PropTypes } from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class TestModal extends React.Component {
  static propTypes = {
    // This view takes a isLoading property
    isLoading: PropTypes.bool,
  }
  state = {
    isShowingModal: false,
  }
  handleClick = () => this.setState({ isShowingModal: true })
  handleClose = () => this.setState({ isShowingModal: false })
  render() {
    const dialogStyle = {
      marginTop: '0px',
      marginBottom: '0px',
    };
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
            'loading' :
            <ModalDialog style={{ width: '50%' }} onClose={this.handleClose}>
              <h1 style={dialogStyle}>User Details</h1>
              <hr />
              <h3>Username: {this.props.username}</h3>
              <h3>Role: {this.props.role}</h3>
            </ModalDialog>
          }
        </ModalContainer>
      }
    </div>;
  }
}

export default TestModal;
