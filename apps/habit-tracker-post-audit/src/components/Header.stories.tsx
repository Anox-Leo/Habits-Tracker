import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
    },
    totalHabits: { control: { type: 'number', min: 0, max: 20 } },
    completedHabits: { control: { type: 'number', min: 0, max: 20 } },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LightTheme: Story = {
  args: {
    theme: 'light',
    totalHabits: 5,
    completedHabits: 3,
    onToggleTheme: () => console.log('Toggle theme'),
    onResetProgress: () => console.log('Reset progress'),
  },
};

export const DarkTheme: Story = {
  args: {
    ...LightTheme.args,
    theme: 'dark',
  },
  decorators: [
    (Story) => {
      document.documentElement.setAttribute('data-theme', 'dark');
      return Story();
    },
  ],
};

export const NoHabits: Story = {
  args: {
    ...LightTheme.args,
    totalHabits: 0,
    completedHabits: 0,
  },
};

export const AllCompleted: Story = {
  args: {
    ...LightTheme.args,
    totalHabits: 7,
    completedHabits: 7,
  },
};
