import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';
import configureStore from 'redux-mock-store';
import InfoModal from '../../src/components/InfoModal';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('<InfoModal />', () => {
  const initialState = {
    info: {
      ui: {
        lastUpdate: '22/01/2017',
        version: '0.0.1',
        currentlySending: 'false',
      },
      api: {
        lastApiUpdate: '20/04/2017',
        lastDataUpdate: '20/05/2017',
        version: '0.0.2',
        currentlySending: 'false',
      }
    }
  };
  const mockStore = configureStore();
  let store,wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    store = mockStore(initialState)
    wrapper = mount( <Provider store={store}><InfoModal /></Provider> )
  });

  it('renders the correct error message from props', () => {
    expect(wrapper.find('InfoModal').state().showModal).to.equal(false);
    wrapper.find('InfoModal').find('#iconDiv').simulate('click');
    expect(wrapper.find('InfoModal').state().showModal).to.equal(true);
    expect(false).to.equal(false);
  });
});
