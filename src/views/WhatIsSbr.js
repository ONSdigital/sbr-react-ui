import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import TitleAndDescription from '../components/TitleAndDescription';

const WhatIsSbr = () => {
  const items = [
    { name: 'What Is SBR', link: '' },
  ];
  return (
    <div>
      <BreadCrumb breadCrumbItems={items} />
      <TitleAndDescription
        marginBottom={1}
        title="What is SBR?"
        description="SBR details etc."
      />
    </div>
  );
};

export default WhatIsSbr;
