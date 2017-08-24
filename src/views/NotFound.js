import React from 'react';
import BreadCrumb from '../components/BreadCrumb';

const NotFound = () => {
  const items = [
    { name: 'Not Found', link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="404 Not Found"
        description="Please navigate to a valid URL."
        breadCrumbItems={items}
      />
    </div>
  );
};

export default NotFound;
