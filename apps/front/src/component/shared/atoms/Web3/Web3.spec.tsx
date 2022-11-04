import React from 'react'
import { render, screen } from '@testing-library/react'
import { Web3 } from './Web3'

test('h1要素を持つ', () => {
  render(<Web3 />)
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
})
