import type { Meta, StoryObj } from '@storybook/react';
import AddHabitForm from './AddHabitForm';

const meta: Meta<typeof AddHabitForm> = {
  title: 'Components/AddHabitForm',
  component: AddHabitForm,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AddHabitForm>;

export const Collapsed: Story = {
  args: {
    onAddHabit: (data) => console.log('Add habit:', data),
  },
};

export const Expanded: Story = {
  args: {
    ...Collapsed.args,
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('.expand-toggle');
    if (button instanceof HTMLElement) {
      button.click();
    }
  },
};
