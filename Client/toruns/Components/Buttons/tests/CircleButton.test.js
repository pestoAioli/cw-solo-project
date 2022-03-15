import React from 'react';
import renderer from "react-test-renderer";
import { cleanup } from '@testing-library/react-native';
import CircleButton from '../CircleButton';

beforeEach(() => {
  jest.useFakeTimers();
})
afterEach(cleanup);

describe('<CircleButton/>',() => {
  it('should render a component', async () => {
    const tree = await renderer.create(<CircleButton/>).toTree()
    expect(tree.nodeType).toBe('component')
  })
})
