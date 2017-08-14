import React from 'react';
import { shallow } from 'enzyme';

import ShelfSelect from '../ShelfSelect';

describe('<ShelfSelect />', function() {
  const mockOnShelfChange = jest.fn();

  const component = shallow(
    <ShelfSelect
      onChange={mockOnShelfChange}
      value="read"
    />
  );

  it('has five options', () => {
    const options = component.find('option');
    expect(options).toHaveLength(5);
  });

  it('calls the passed onChange function when option is changed', () => {
    component.find('select').simulate('change');
    expect(mockOnShelfChange).toBeCalled();
  });
});
