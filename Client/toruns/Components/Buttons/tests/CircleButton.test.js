import React from 'react';
import renderer from "react-test-renderer";
import { act } from 'react-dom/test-utils';

import { cleanup } from '@testing-library/react-native';

beforeEach(() => {
  jest.useFakeTimers();
})
afterEach(cleanup);

describe('<CircleButton/>', () => {
  it('should render a button', async () => {

  })
})
