import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import TitleAndDescription from '../components/TitleAndDescription';

const ContactUs = () => {
  const items = [
    { name: 'Contact Us', link: '' },
  ];
  return (
    <div>
      <BreadCrumb breadCrumbItems={items} />
      <TitleAndDescription
        title="Contact Us"
        description="Contact Us details etc."
        marginBottom={1}
      />
    </div>
  );
};

export default ContactUs;
