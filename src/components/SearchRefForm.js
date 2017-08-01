import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'halogen/PulseLoader';

const SearchRefForm = function ({
  currentlySending, onSubmit, onChange, valid, value,
}) {
  const spinner = (<Loader color="#FFFFFF" size="10px" margin="0px" />);
  const icon = (<span className="icon icon-search--light"></span>);
  const buttonContent = (currentlySending) ? spinner : icon;
  return (
    <form className="col-wrap search__form" action="/search" method="get">
      <label className="search__label col col--md-5 col--lg-6" htmlFor="nav-search">Search</label>
      <input placeholder="Enter ref to search..." autoFocus value={value} onChange={onChange} type="search" autoComplete="on" className="search__input col col--md-21 col--lg-32" id="nav-search" name="q" value={value} />
      <button onClick={!currentlySending ? onSubmit : null} aria-label="Search reference button" loading={currentlySending} type="submit" className={`search__button col--md-3 col--lg-3 ${valid}`} id="nav-search-submit">
        {buttonContent}
      </button>
    </form>
  );
};

SearchRefForm.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  valid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchRefForm;
