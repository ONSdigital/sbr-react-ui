import React from 'react';

// https://stackoverflow.com/questions/24171226/removing-element-from-dom-after-set-amount-of-time
const Expire = React.createClass({
  getDefaultProps() {
    return { delay: 1000 };
  },
  getInitialState() {
    return { visible: true };
  },
  componentWillReceiveProps(nextProps) {
    // reset the timer if children are changed
    if (nextProps.children !== this.props.children) {
      this.setTimer();
      this.setState({ visible: true });
    }
  },
  componentDidMount() {
    this.setTimer();
  },
  setTimer() {
    // clear any existing timer
    this._timer != null ? clearTimeout(this._timer) : null;

    // hide after `delay` milliseconds
    this._timer = setTimeout(function(){
      this.setState({ visible: false });
      console.log('FALSE')
      this._timer = null;
    }.bind(this), this.props.delay);
  },
  componentWillUnmount() {
    clearTimeout(this._timer);
  },
  render() {
    return this.state.visible 
      ? <div>{this.props.children}</div>
      : <span />;
  },
});

export default Expire;
