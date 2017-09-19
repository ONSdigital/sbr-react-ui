import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSpecificUnitType } from '../actions/ApiActions';

class PanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTreeView: 0,
    };
    this.toggleTreeView = this.toggleTreeView.bind(this);
  }
  toggleTreeView(unitType, enterpriseId) {
    // console.log(unitType)
    // console.log(enterpriseId)
    // if (this.state.showTreeView === 0) {
    //   // Need to make sure the ENT data is present (for the child json)
    //   if (this.props.data.results.le)
    //   if (this.props.data.results[0].id === enterpriseId) {
    //     // We already have the data, continue to the Tree View
    //     const showTreeView = this.state.showTreeView + 1;
    //     this.setState({ showTreeView });
    //   } else {
    //     this.props.dispatch(getSpecificUnitType('ENT', enterpriseId));
    //   }

    if (this.state.showTreeView === 2) {
      this.setState({ showTreeView: 0 });
    } else {
      const showTreeView = this.state.showTreeView + 1;
      this.setState({ showTreeView });
    }
  }
  render() {
    // We need to pass toggleTreeView & showTreeView into each data Panel
    // https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
    const childrenWithProps = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        toggleTreeView: this.toggleTreeView,
        showTreeView: this.state.showTreeView,
      }),
    );
    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}

PanelContainer.propTypes = {
  children: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.enterprise,
  };
}

export default connect(select)(PanelContainer);
