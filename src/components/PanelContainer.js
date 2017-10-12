import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErrorModal from '../components/ErrorModal';
import { store } from '../routes';

class PanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTreeView: 0,
      errorMessage: '',
      show: true,
      loading: false,
      previousStoreState: {},
    };
    this.toggleTreeView = this.toggleTreeView.bind(this);
    this.goToView = this.goToView.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    this.errorPresent(this.props.enterpriseLoading, this.props.companyLoading, this.props.vatLoading, this.props.leuLoading, this.props.payeLoading);
    store.subscribe(() => {
      const reduxStore = store.getState();
      this.setState({ previousStoreState: reduxStore });
      let a = false;
      if (reduxStore.apiSearch.enterprise.errorMessage !== '') {
        this.setState({ errorMessage: reduxStore.apiSearch.enterprise.errorMessage });
        a = true;
      }
      if (reduxStore.apiSearch.ch.errorMessage !== '') {
        this.setState({ errorMessage: reduxStore.apiSearch.ch.errorMessage });
        a = true;
      }
      if (reduxStore.apiSearch.vat.errorMessage !== '') {
        this.setState({ errorMessage: reduxStore.apiSearch.vat.errorMessage });
        a = true;
      }
      if (reduxStore.apiSearch.paye.errorMessage !== '') {
        this.setState({ errorMessage: reduxStore.apiSearch.paye.errorMessage });
        a = true;
      }
      if (reduxStore.apiSearch.legalUnit.errorMessage !== '') {
        this.setState({ errorMessage: reduxStore.apiSearch.legalUnit.errorMessage });
        a = true;
      }

      if (!a) {
        this.setState({ errorMessage: '' });
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    const a = this.errorPresent(nextProps.enterpriseLoading, nextProps.companyLoading, nextProps.vatLoading, nextProps.leuLoading, nextProps.payeLoading);
    if (a) {
      this.setState({ loading: true });
    } else {
      this.setState({ loading: false });
    }

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
  }
  errorPresent(...args) {
    return args.reduce((a, b) => a || b);
  }
  closeModal() {
    this.setState({ show: false, errorMessage: '' });
  }
  toggleTreeView(unitType, enterpriseId) {
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
        <ErrorModal
          show={this.state.show && this.state.errorMessage !== ''}
          message={this.state.errorMessage}
          close={this.closeModal}
        />
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
    enterpriseError: state.apiSearch.enterprise.errorMessage,
    companyError: state.apiSearch.ch.errorMessage,
    vatError: state.apiSearch.vat.errorMessage,
    leuError: state.apiSearch.legalUnit.errorMessage,
    payeError: state.apiSearch.paye.errorMessage,
    enterpriseLoading: state.apiSearch.enterprise.currentlySending,
    companyLoading: state.apiSearch.ch.currentlySending,
    vatLoading: state.apiSearch.vat.currentlySending,
    leuLoading: state.apiSearch.legalUnit.currentlySending,
    payeLoading: state.apiSearch.paye.currentlySending,
  };
}

export default connect(select)(PanelContainer);
