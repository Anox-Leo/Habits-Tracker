import type { Meta, StoryObj } from '@storybook/react';
import ColorPicker from './ColorPicker';
import { HABIT_COLORS } from '../constants/colors';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    colors: HABIT_COLORS,
    selectedColor: HABIT_COLORS[0],
    onColorSelect: (color) => console.log('Selected', color),
  },
};

export const ThirdSelected: Story = {
  args: {
    ...Default.args,
    selectedColor: HABIT_COLORS[2],
  },
};

export const FewColors: Story = {
  args: {
    colors: ['#ef4444', '#10b981', '#3b82f6'],
    selectedColor: '#10b981',
    onColorSelect: (color) => console.log('Selected', color),
  },
};
