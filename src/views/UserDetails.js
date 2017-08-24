import React from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '../components/BreadCrumb';

const UserDetails = ({ username, role }) => {
  const items = [
    { name: 'User Details', link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="User Details"
        description="Information about the user logged in"
        marginBottom={1}
        breadCrumbItems={items}
      />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <p className="page-intro__content">
            User - {username}
            <br /><br />
            Role - {role}
          </p>
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
