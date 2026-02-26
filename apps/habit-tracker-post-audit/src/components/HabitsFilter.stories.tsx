import type { Meta, StoryObj } from '@storybook/react';
import HabitsFilter from './HabitsFilter';

const meta: Meta<typeof HabitsFilter> = {
  title: 'Components/HabitsFilter',
  component: HabitsFilter,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HabitsFilter>;

export const Default: Story = {
  args: {
    filter: 'all',
    sortBy: 'created',
    searchTerm: '',
    onFilterChange: (f) => console.log('Filter:', f),
    onSortChange: (s) => console.log('Sort:', s),
    onSearchChange: (t) => console.log('Search:', t),
  },
};

export const WithSearch: Story = {
  args: {
    ...Default.args,
    searchTerm: 'exercise',
  },
};

export const FilteredCompleted: Story = {
  args: {
    ...Default.args,
    filter: 'completed',
  },
};

export const SortedByName: Story = {
  args: {
    ...Default.args,
    sortBy: 'name',
  },
};
