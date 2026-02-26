import type { Meta, StoryObj } from '@storybook/react';
import HabitCard from './HabitCard';
import type { Habit } from '../types/Habit';

const createMockHabit = (overrides: Partial<Habit> = {}): Habit => ({
  id: '1',
  name: 'Morning Exercise',
  color: '#3b82f6',
  completedDays: {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  },
  createdAt: new Date().toISOString(),
  ...overrides,
});

const meta: Meta<typeof HabitCard> = {
  title: 'Components/HabitCard',
  component: HabitCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HabitCard>;

export const Default: Story = {
  args: {
    habit: createMockHabit(),
    onToggleDay: (id, day) => console.log(`Toggle ${day} for habit ${id}`),
    onEdit: (habit) => console.log('Edit', habit.name),
    onDelete: (id) => console.log('Delete', id),
  },
};

export const FullyCompleted: Story = {
  args: {
    ...Default.args,
    habit: createMockHabit({
      name: 'Read 30 minutes',
      color: '#10b981',
      completedDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      },
    }),
  },
};

export const NoProgress: Story = {
  args: {
    ...Default.args,
    habit: createMockHabit({
      name: 'Meditation',
      color: '#8b5cf6',
      completedDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
    }),
  },
};

export const WithStreak: Story = {
  args: {
    ...Default.args,
    habit: createMockHabit({
      name: 'Drink Water',
      color: '#06b6d4',
      completedDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    }),
  },
};

export const CustomColor: Story = {
  args: {
    ...Default.args,
    habit: createMockHabit({
      name: 'Learn TypeScript',
      color: '#f59e0b',
    }),
  },
};
