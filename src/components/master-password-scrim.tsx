import React, { useState, useEffect, useRef } from 'react';

interface MasterPasswordModalProps {
  onClose: () => void;
  onSubmit: (password: string) => void;
}

const MasterPasswordModal: React.FC<MasterPasswordModalProps> = ({ onClose, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Handle Escape key to close the modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Open modal when component mounts
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeModal = () => {
    dialogRef.current?.close();
    onClose(); // Notify the parent to update state
  };

  // Function to validate password and set error messages
  const validatePassword = () => {
    const errorMessages: string[] = [];
    if (password.length < 6) {
      errorMessages.push('Password must be at least 6 characters long.');
    }
    if (!/\d/.test(password)) {
      errorMessages.push('Password must contain at least one number.');
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      errorMessages.push('Password must contain at least one special character.');
    }
    setErrors(errorMessages);
    return errorMessages.length === 0; // Returns true if no errors
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validatePassword()) {
      onSubmit(password);
      closeModal(); // Close modal after successful submission
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="password-modal bg-white p-6 rounded shadow-md max-w-xs w-full"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Enter Master Password</h2>
        <p className="text-sm">Needed when decoding the image</p>
        <input // to satisfy the chrome suggestion to include a hidden username field to help password managers
          type="text"
          id="username"
          name="username"
          autoComplete="username"
          className="sr-only"
          tabIndex={-1} // Makes it non-focusable
        ></input>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // No longer clearing errors on change
          placeholder="Enter master password"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          required
          autoComplete="new-password"
        />
        {errors.length > 0 && (
          <ul className="text-red-500 text-sm list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default MasterPasswordModal;
