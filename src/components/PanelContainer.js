import React from 'react';
import PropTypes from 'prop-types';

class PanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTreeView: 0,
    };
    this.toggleTreeView = this.toggleTreeView.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // The below is to fix a bug where if you are on TreeView and you navigate
    // from one node to another of the same type, e.g. LEU -> LEU, the node
    // will change but you will stay on tree view rather than going back to
    // the original view.
    if (this.props.children.type.name === nextProps.children.type.name) {
      this.setState({ showTreeView: 0 });
    }
  }
  toggleTreeView(unitType, enterpriseId) {
    // const a = document.getElementById('test1290');
    if (this.state.showTreeView === 2) {
      this.setState({ showTreeView: 0 });
      // a.style = '';
      // a.style.marginRight = '0px';
      // a.className = 'wrapper';
    } else {
      const showTreeView = this.state.showTreeView + 1;
      this.setState({ showTreeView });
      // a.className = '';
      // a.style.marginLeft = '50px';
      // a.style.marginRight = '50px';
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
};

export default PanelContainer;
