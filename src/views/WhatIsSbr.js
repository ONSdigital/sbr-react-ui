import React from 'react';
import BreadCrumb from '../components/BreadCrumb';

const WhatIsSbr = () => {
  const items = [
    { name: 'What Is SBR', link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="What is SBR?"
        description="SBR details etc."
        breadCrumbItems={items}
      />
    </div>
  );
};

export default WhatIsSbr;
