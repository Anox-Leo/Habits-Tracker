import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    percentage: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Empty: Story = {
  args: {
    percentage: 0,
    color: '#3b82f6',
  },
};

export const HalfComplete: Story = {
  args: {
    percentage: 50,
    color: '#3b82f6',
  },
};

export const AlmostDone: Story = {
  args: {
    percentage: 85,
    color: '#10b981',
  },
};

export const FullyComplete: Story = {
  args: {
    percentage: 100,
    color: '#10b981',
  },
};

export const CustomColor: Story = {
  args: {
    percentage: 60,
    color: '#f59e0b',
  },
};
