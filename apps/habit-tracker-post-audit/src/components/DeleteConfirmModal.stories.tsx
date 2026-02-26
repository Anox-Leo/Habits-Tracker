import type { Meta, StoryObj } from '@storybook/react';
import DeleteConfirmModal from './DeleteConfirmModal';

const meta: Meta<typeof DeleteConfirmModal> = {
  title: 'Components/DeleteConfirmModal',
  component: DeleteConfirmModal,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DeleteConfirmModal>;

export const Default: Story = {
  args: {
    onCancel: () => console.log('Cancel'),
    onConfirm: () => console.log('Confirm delete'),
  },
};
