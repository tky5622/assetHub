import { type ComponentMeta, type ComponentStoryObj } from '@storybook/react'
import { Web3 } from './Web3'

type T = typeof Web3
type Meta = ComponentMeta<T>
type Story = ComponentStoryObj<T>

import { ComponentPropsWithoutRef } from 'react'
const args: ComponentPropsWithoutRef<T> = {}

export default {
  component: Web3,
  args,
} as Meta

export const Default: Story = {}
