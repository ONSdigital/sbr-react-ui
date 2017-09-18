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
  toggleTreeView() {
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
};

export default PanelContainer;
