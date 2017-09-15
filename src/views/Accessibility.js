import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import TitleAndDescription from '../components/TitleAndDescription';

const Accessibility = () => {
  const items = [
    { name: 'Accessibility', link: '' },
  ];
  return (
    <div>
      <BreadCrumb breadCrumbItems={items} />
      <TitleAndDescription
        title="Accessibility"
        description="Accessibility details etc."
        marginBottom={1}
      />
    </div>
  );
};

export default Accessibility;
