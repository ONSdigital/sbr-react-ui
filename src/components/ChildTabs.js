import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUnitForPeriod } from '../actions/ApiActions';

/**
 * @class ChildTabs - The ChildTabs are shown on parent units such as the Enterprise
 * and Legal Unit. On an Enterprise, all the child units are shown, whereas on a
 * Legal Unit, only VAT/PAYE/CH references are shown.
 */
class ChildTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: (props.unitType === 'ENT') ? 1 : 3,
    };
  }
  onChange = (newTabIndex) => this.setState({ ...this.state, activeTab: newTabIndex });
  getChildRef = (unitType) => Object.entries(this.props.childRefs).map(([key, value]) => {
    if (value === unitType) return key;
    return null;
  }).filter(x => x !== null);
  generateTable = (unitType, condition) => {
    if (condition) {
      return (<div>
        <table className="unit-info">
          <tbody>
            <tr><th className="venus legal">{unitType}</th></tr>
            {this.generateTabContent(unitType, this.getChildRef(unitType))}
          </tbody>
        </table>
      </div>);
    }
    return null;
  };
  generateTabContent = (unitType, refsArr) => (refsArr.length === 0 ?
    (<tr key={0}><th className="mars legal">No child references</th></tr>) :
    (refsArr.map(ref => <tr key={ref}><th className="mars legal"><a style={{ cursor: 'pointer' }} className="breadcrumb__link"onClick={() => this.props.getUnitForPeriod(ref, unitType, this.props.period, true)}>{ref}</a></th></tr>)));
  render = () => {
    const activeTab = this.state.activeTab;
    const activeClassName = (index) => ((index === this.state.activeTab) ? 'active' : '');
    const mouseStyle = (index) => (index === activeTab ? {} : { cursor: 'pointer' });
    return (
      <div className="wrapper">
        <div className="group">
          <div className="col-12">
            <ul className="tabs clearfix u-mb-l" data-tabgroup="first-tab-group">
              {(this.props.unitType === 'ENT') &&
                <div>
                  <li><a style={mouseStyle(1)} onClick={(activeTab === 1 ? null : () => this.onChange(1))} className={activeClassName(1)}>Legal Units ({this.getChildRef('LEU').length})</a></li>
                  <li><a style={mouseStyle(2)} onClick={(activeTab === 2 ? null : () => this.onChange(2))} className={activeClassName(2)}>Local Units ({this.getChildRef('LOU').length})</a></li>
                </div>
              }
              <li><a style={mouseStyle(3)} onClick={(activeTab === 3 ? null : () => this.onChange(3))} className={activeClassName(3)}>CH ({this.getChildRef('CH').length})</a></li>
              <li><a style={mouseStyle(4)} onClick={(activeTab === 4 ? null : () => this.onChange(4))} className={activeClassName(4)}>PAYE ({this.getChildRef('PAYE').length})</a></li>
              <li><a style={mouseStyle(5)} onClick={(activeTab === 5 ? null : () => this.onChange(5))} className={activeClassName(5)}>VAT ({this.getChildRef('VAT').length})</a></li>
            </ul>
            <section id="first-tab-group" className="tabgroup u-mb-l">
              {this.generateTable('LEU', (activeTab === 1 && this.props.unitType === 'ENT'))}
              {this.generateTable('LOU', (activeTab === 2 && this.props.unitType === 'ENT'))}
              {this.generateTable('CH', activeTab === 3)}
              {this.generateTable('PAYE', activeTab === 4)}
              {this.generateTable('VAT', activeTab === 5)}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

ChildTabs.propTypes = {
  period: PropTypes.string.isRequired,
  unitType: PropTypes.string.isRequired,
  childRefs: PropTypes.object.isRequired,
  getUnitForPeriod: PropTypes.func.isRequired,
};

export default connect(null, { getUnitForPeriod })(ChildTabs);
