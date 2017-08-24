import React from 'react';
import BreadCrumb from '../components/BreadCrumb';

const Accessibility = () => {
  const items = [
    { name: 'Accessibility', link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="Accessibility"
        description="Accessibility details etc."
        breadCrumbItems={items}
      />
    </div>
  );
};

export default Accessibility;
