import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Glyphicon, Button, ButtonToolbar, Row, Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { getSpecificUnitType, changePeriod } from '../actions/ApiActions';
import periods from '../config/periods';
import { REFS, SET_PERIOD } from '../constants/ApiConstants';

class PanelTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
    };
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.onPeriodChange = this.onPeriodChange.bind(this);
  }
  onPeriodChange(evt) {
    this.props.dispatch(changePeriod(evt.target.value));
    this.props.dispatch(getSpecificUnitType(this.props.unitType, this.props.id));
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
    const style = {
      marginLeft: '0px',
    };
    const editButton = (<Button onClick={() => this.props.goToEditView()} style={style}><Glyphicon glyph="edit" /></Button>);
    const displayEditButton = (this.props.unitType === 'ENT') ? editButton : null;
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
        <Col lg={8} md={7} sm={6} xs={6} style={{ height: '30px', border: 'none' }}>
          <h3 {...props} onMouseEnter={() => this.mouseEnter()} onMouseLeave={() => this.mouseLeave()} id="panel-title-data-tip" style={h3Style}>
            <Glyphicon glyph="tower" />&nbsp;{this.props.name} <small>{this.props.id}</small>
          </h3>
        </Col>
        <Col lg={4} md={5} sm={6} xs={6} style={{ height: '30px', border: 'none' }}>
          {(this.props.unitType !== 'LEU') &&
            <select onChange={this.onPeriodChange} value={this.props.data.period} style={{ height: '34px', float: 'right' }}>
              {
                periods.ALL_PERIODS.map((period) => {
                  return (<option key={period} value={period}>{period}</option>);
                })
              }
            </select>
          }
          <ButtonToolbar className="pull-right" >
            {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
            {/* <Button bsStyle="primary" onClick={() => goToDataView()}><Glyphicon glyph="tree-deciduous" />&nbsp;Toggle Tree View</Button> */}
            <Button onClick={() => this.props.goToDataView()}><Glyphicon glyph="list" /></Button>
            {displayEditButton}
            <Button style={style} onClick={() => this.props.goToTreeView1()}><Glyphicon glyph="tree-deciduous" /></Button>
            <Button style={style} onClick={() => this.props.goToTreeView2()}><Glyphicon glyph="tree-conifer" /></Button>
          </ButtonToolbar>
        {/* <Col lg={3} md={3} sm={4} xs={5} style={{ height: '30px', border: 'none' }}> */}
        
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
  data: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  unitType: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  accessor: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  goToDataView: PropTypes.func.isRequired,
  goToEditView: PropTypes.func.isRequired,
  goToTreeView1: PropTypes.func.isRequired,
  goToTreeView2: PropTypes.func.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch,
  };
}

export default connect(select)(PanelTitle);
