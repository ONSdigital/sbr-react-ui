import React from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '../components/BreadCrumb';

const style = {
  width: '260px',
};

const UserDetails = ({ username, role }) => {
  const items = [
    { name: 'User Details', link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="User Details"
        description=""
        breadCrumbItems={items}
      />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <ul className="a-z-list padding-top-md--1 padding-top-sm--1 padding-left-lg--3">
            <li style={style}>
              User: {username}
            </li>
            <li style={style}>
              Role: {role}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  username: React.PropTypes.string.isRequired,
  role: React.PropTypes.string.isRequired,
};

function select(state) {
  return {
    username: state.login.username,
    role: state.login.role,
  };
}

export default connect(select)(UserDetails);
