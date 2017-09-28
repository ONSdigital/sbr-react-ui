import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Button, Row, Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';

class PanelTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
    };
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }
  mouseEnter() {
    const a = document.getElementById('panel-title-data-tip');
    if (a.offsetWidth < a.scrollWidth) {
      this.setState({ showTooltip: true });
    }
  }
  mouseLeave() {
    this.setState({ showTooltip: false });
  }
  render() {
    // Note: We should use a bootstrap tooltip/modal/overlay etc. for the title overflow,
    // however there is an issue with dynamic bootstrap elements not inheriting css, so
    // we use react-tooltip
    const h3Style = {
      margin: '0px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      cursor: (this.state.showTooltip) ? 'pointer' : '',
    };
    const props = (this.state.showTooltip) ? {
      'data-tip': true,
      'data-for': 'tooltip',
    } : '';
    return (
      <Row style={{ height: '30px', border: 'none' }}>
        <Col lg={9} md={9} sm={8} xs={7} style={{ height: '30px', border: 'none' }}>
          <h3 {...props} onMouseEnter={() => this.mouseEnter()} onMouseLeave={() => this.mouseLeave()} id="panel-title-data-tip" style={h3Style}>
            <Glyphicon glyph="tower" />&nbsp;{this.props.name} <small>{this.props.id}</small>
          </h3>
        </Col>
        <Col lg={3} md={3} sm={4} xs={5} style={{ height: '30px', border: 'none' }}>
          <Button className="pull-right" bsSize="small" bsStyle="primary" onClick={() => this.props.toggle()}><Glyphicon glyph="tree-deciduous" />&nbsp;Toggle Tree View</Button>
        </Col>
        {this.state.showTooltip &&
          <ReactTooltip id="tooltip" type="info">
            <span>{this.props.name} - {this.props.id}</span>
          </ReactTooltip>
        }
      </Row>
    );
  }
}

PanelTitle.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default PanelTitle;
