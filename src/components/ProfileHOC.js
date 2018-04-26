import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Panel from '../patterns/Panel';
import ResultsSearchForm from './ResultsSearchForm';
import BreadCrumb from './BreadCrumb';
import Badge from '../patterns/Badge';
import Id from '../patterns/Id';
import ChildTabs from './ChildTabs';
import { createBreadCrumbItems } from '../utils/helperMethods';

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
  const ProfileHOC = (props) => {
    const unit = props.unit;
    const ent = props.enterprise;
    const unitType = config.unitType;
    return (
      <section>
        <ResultsSearchForm
          currentlySending={props.currentlySending}
          query={props.query}
          onSubmit={props.onSubmit}
          onChange={props.onChange}
        />
        <section>
          <BreadCrumb breadCrumbItems={createBreadCrumbItems(unit, ent, config)} />
          <section>
            <div className="main-content">
              <div className="wrapper">
                <Panel id="searchErrorPanel" text={props.errorMessage} level="error" show={props.showError} close={props.closeModal} marginBottom="1rem" />
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
  };

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
