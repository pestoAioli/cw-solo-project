import React from 'react';
import renderer, { act } from "react-test-renderer";
import App from "./App";
import { cleanup } from '@testing-library/react-native';

beforeEach(() => {
  jest.useFakeTimers();
})
afterEach(cleanup);

describe('<App />', () => {
  it('has 1 child', async () => {
    const tree = await renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  })
}) 