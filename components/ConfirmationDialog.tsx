
import React from 'react';
import Modal from './Modal';

interface ConfirmationDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ title, message, onConfirm, onCancel }) => {
  return (
    <Modal title={title} onClose={onCancel}>
      <div className="text-text-secondary">
        <p>{message}</p>
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onCancel} className="px-4 py-2 bg-surface text-text-primary rounded-md hover:bg-border">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
