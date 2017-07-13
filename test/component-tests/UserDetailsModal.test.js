import 'jsdom-global/register';
import React from 'react';
import UserDetailsModal from '../../src/components/UserDetailsModal';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

describe('<UserDetailsModal />', () => {
  it('renders the correct error message from props', () => {
    const wrapper = mount(
      <UserDetailsModal username="jonDoe123" userRole="admin" />
    );
    expect(wrapper.props().username).to.equal('jonDoe123');
    expect(wrapper.props().userRole).to.equal('admin');
  });

  it('renders the correct error message from props', () => {
    const wrapper = mount(
      <UserDetailsModal
        username="jonDoe123"
        userRole="admin"
      />
    );
    expect(wrapper.state().showModal).to.equal(false);
    wrapper.find('#iconDiv').simulate('click');
    expect(wrapper.state().showModal).to.equal(true);
  });
});
