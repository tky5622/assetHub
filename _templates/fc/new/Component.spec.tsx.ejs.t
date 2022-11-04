---
to: <%= path %>/<%= name%>.spec.tsx
---
import React from 'react';
import { render, screen } from '@testing-library/react';
import { <%= name%> } from './<%= name%>';


test('h1要素を持つ', () => {
  render(<<%= name%> />);
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
})
