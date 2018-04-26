import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Panel from '../patterns/Panel';
import ResultsSearchForm from './ResultsSearchForm';
import BreadCrumb from './BreadCrumb';
import Badge from '../patterns/Badge';
import Id from '../patterns/Id';
import ChildTabs from './ChildTabs';

/**
 * @function withProfile - This is a higher order component that accepts a component
 * (which is either the Home/Results page) and wraps it with the common logic
 * for changing form values and searching.
 *
 * https://reactjs.org/docs/higher-order-components.html
 *
 * @param {Object} Profile - The child react component
 * @param {Object} config - The configuration for json fields, reducer fields etc.
 */
export default function withProfile(Profile, config) {
  class ProfileHOC extends React.Component {
    createBreadCrumbItems = () => {
      const unit = this.props.unit;
      const ent = this.props.enterprise;
      if (config.unitType === 'ENT') {
        return [
          { name: `Enterprise - ${unit.id}`, link: '' },
        ];
      } else if (config.unitType === 'LEU' || config.unitType === 'LOU') {
        // LEU and LOU are both children of an ENT
        return [
          { name: `Enterprise - ${unit.parents.ENT}`, link: `/Results/Period/${unit.period}/Enterprise/${unit.parents.ENT}` },
          { name: `${config.unitName} - ${unit.id}`, link: '' },
        ];
      }
      // VAT, PAYE & CH are all grandchildren of an ENT
      return [
        { name: `Enterprise - ${ent.id}`, link: `/Results/Period/${unit.period}/Enterprise/${ent.id}` },
        {
          name: `Legal Unit - ${unit.parents.LEU}`,
          link: `/Results/Period/${unit.period}/LegalUnit/${unit.parents.LEU}`,
          id: unit.parents.LEU,
          period: unit.period,
        },
        { name: `${config.unitName} - ${unit.id}`, link: '' },
      ];
    }
    render = () => {
      const unit = this.props.unit;
      const unitType = config.unitType;
      return (
        <section>
          <ResultsSearchForm
            currentlySending={this.props.currentlySending}
            query={this.props.query}
            onSubmit={this.props.onSubmit}
            onChange={this.props.onChange}
          />
          <section>
            <BreadCrumb breadCrumbItems={this.createBreadCrumbItems()} />
            <section>
              <div className="main-content">
                <div className="wrapper">
                  <Panel id="searchErrorPanel" text={this.props.errorMessage} level="error" show={this.props.showError} close={this.props.closeModal} marginBottom="1rem" />
                  <div className="group">
                    <div className="col-12">
                      <h3 className="jupiter sml-margin">{unit.vars[config.nameKey]}</h3>
                      <Badge name={config.unitName} colour={config.colour} />
                      <Id field={config.idName} id={unit.id} />
                      <Profile unit={unit} />
                      {(unitType === 'ENT' || unitType === 'LEU') &&
                        <ChildTabs period={unit.period} unitType={unitType} childRefs={unit.children} />
                      }
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </section>
      );
    }
  }

  const select = (state) => ({
    currentlySending: state.apiSearch.currentlySending,
    errorMessage: state.apiSearch.errorMessage,
    enterprise: state.apiSearch.units.ENT,
    unit: state.apiSearch.units[config.unitType],
  });

  ProfileHOC.propTypes = {
    unit: PropTypes.object.isRequired,
    enterprise: PropTypes.object.isRequired,
    currentlySending: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    showError: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  return connect(select)(ProfileHOC);
}
