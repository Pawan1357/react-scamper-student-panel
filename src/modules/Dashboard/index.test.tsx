import { render } from '@testing-library/react';
import { describe } from 'vitest';

import Dashboard from '.';

describe('Dashboard', () => {
  test('Dashboard page should render correctly', () => {
    render(<Dashboard />);
  });
});
