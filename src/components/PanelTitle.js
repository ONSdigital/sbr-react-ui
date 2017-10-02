import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Button, Row, Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import periods from '../config/periods';

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
        <Col lg={8} md={8} sm={7} xs={6} style={{ height: '30px', border: 'none' }}>
          <h3 {...props} onMouseEnter={() => this.mouseEnter()} onMouseLeave={() => this.mouseLeave()} id="panel-title-data-tip" style={h3Style}>
            <Glyphicon glyph="tower" />&nbsp;{this.props.name} <small>{this.props.id}</small>
          </h3>
        </Col>
        <Col lg={4} md={4} sm={5} xs={6} style={{ height: '30px', border: 'none' }}>
          <select style={{ height: '30px', float: 'right' }}>
            {
              periods.ALL_PERIODS.map((period) => {
                return (<option key={period} value={period}>{period}</option>);
              })
            }
          </select>
          <Button style={{ float: 'right' }} bsSize="small" bsStyle="primary" onClick={() => this.props.toggle()}><Glyphicon glyph="tree-deciduous" />&nbsp;Toggle Tree View</Button>
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
