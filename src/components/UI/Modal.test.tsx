import React from 'react';
import { mount } from 'enzyme';
import Modal from './Modal';

describe('Modal component', () => {
  it('renders without crashing', () => {
    const onHideCart = jest.fn();
    const wrapper = mount(<Modal onHideCart={onHideCart}>Modal Content</Modal>);
    expect(wrapper).toBeDefined();
  });

  it('renders the backdrop and modal overlay', () => {
    const onHideCart = jest.fn();
    const wrapper = mount(<Modal onHideCart={onHideCart}>Modal Content</Modal>);
    expect(wrapper.find('.backdrop')).toHaveLength(1);
    expect(wrapper.find('.modal')).toHaveLength(1);
  });

  it('calls onHideCart when backdrop is clicked', () => {
    const onHideCart = jest.fn();
    const wrapper = mount(<Modal onHideCart={onHideCart}>Modal Content</Modal>);
    wrapper.find('.backdrop').simulate('click');
    expect(onHideCart).toHaveBeenCalled();
  });
});
