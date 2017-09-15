import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import TitleAndDescription from '../components/TitleAndDescription';

const NotFound = () => {
  const items = [
    { name: 'Not Found', link: '' },
  ];
  return (
    <div>
      <BreadCrumb breadCrumbItems={items} />
      <TitleAndDescription
        title="404 Not Found"
        description="Please navigate to a valid URL."
        marginBottom={1}
      />
    </div>
  );
};

export default NotFound;
