import React from 'react';
import BreadCrumb from '../components/BreadCrumb';

const ContactUs = () => {
  const items = [
    { name: 'Contact Us', link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="Contact Us"
        description="Contact Us details etc."
        breadCrumbItems={items}
      />
    </div>
  );
};

export default ContactUs;
