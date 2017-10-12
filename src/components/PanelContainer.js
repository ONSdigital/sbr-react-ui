import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErrorModal from '../components/ErrorModal';
import { removeLastError } from '../actions/ApiActions';

class PanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTreeView: 0,
      errorMessage: '',
      show: false,
      loading: false,
      previousStoreState: {},
    };
    this.toggleTreeView = this.toggleTreeView.bind(this);
    this.goToView = this.goToView.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const s = this.isLoading(nextProps.enterpriseLoading, nextProps.companyLoading, nextProps.vatLoading, nextProps.leuLoading, nextProps.payeLoading);
    this.setState({ loading: s });

    // The below is to fix a bug where if you are on TreeView and you navigate
    // from one node to another of the same type, e.g. LEU -> LEU, the node
    // will change but you will stay on tree view rather than going back to
    // the original view.
    if (this.props.children.type.name === nextProps.children.type.name) {
      // For EnterprisePanel, as you cannot navigate between two Enterprises (only 1 on the tree),
      // we don't reset the view, this is because after an Edit has been made and a search
      // is completed again, we want to stay on the same view.
      if (this.props.children.type.name !== 'EnterprisePanel') {
        this.setState({ showTreeView: 0 });
      }
    }

    if (nextProps.error.errorArray.length > 0) {
      this.setState({ show: true, errorMessage: 'generic' });
    }
  }
  isLoading(...args) {
    return args.reduce((a, b) => a || b);
  }
  errorPresent(...args) {
    return args.reduce((a, b) => a || b);
  }
  closeModal() {
    this.props.dispatch(removeLastError());
    this.setState({ show: false, errorMessage: '' });
  }
  toggleTreeView() {
    if (this.state.showTreeView === 2) {
      this.setState({ showTreeView: 0 });
    } else {
      const showTreeView = this.state.showTreeView + 1;
      this.setState({ showTreeView });
    }
  }
  goToView(index) {
    this.setState({ showTreeView: index });
  }
  render() {
    // We need to pass toggleTreeView & showTreeView into each data Panel
    // https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
    const childrenWithProps = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        toggleTreeView: this.toggleTreeView,
        showTreeView: this.state.showTreeView,
        goToView: this.goToView,
      }),
    );
    const c = (this.state.loading) ? 'blur' : '';
    return (
      <div className={c}>
        {childrenWithProps}
        {this.state.show &&
          <ErrorModal
            show={this.state.show && this.state.errorMessage !== ''}
            message={this.state.errorMessage}
            close={this.closeModal}
          />
        }
        {this.state.loading &&
          <div className="spinner"></div>
        }
      </div>
    );
  }
}

PanelContainer.propTypes = {
  children: PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch,
    error: state.error,
    enterpriseLoading: state.apiSearch.enterprise.currentlySending,
    companyLoading: state.apiSearch.ch.currentlySending,
    vatLoading: state.apiSearch.vat.currentlySending,
    leuLoading: state.apiSearch.legalUnit.currentlySending,
    payeLoading: state.apiSearch.paye.currentlySending,
  };
}

export default connect(select)(PanelContainer);
