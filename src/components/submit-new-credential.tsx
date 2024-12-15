import React, { useState } from 'react';

export interface NewCredentialRecord {
  DateAdded: Date;
  DateAddedMilliseconds: number;
  Service: string;
  Username: string;
  Password: string;
}

interface ItemProps {
  sendSingleCredential: (credential: NewCredentialRecord) => void;
  enableAddNewButton: () => void;
  onCancel: () => void;
}

let initialisedTempCredential: NewCredentialRecord = {
  DateAdded: new Date(Date.now()),
  DateAddedMilliseconds: 0,
  Service: '',
  Username: '',
  Password: ''
};

export default function AddNewCredentialsForm({
  sendSingleCredential,
  enableAddNewButton,
  onCancel
}: ItemProps) {
  const [serviceName, setServiceName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serviceNameError, setServiceNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [tempCredential, setTempCredential] =
    useState<NewCredentialRecord>(initialisedTempCredential);

  let validSubmission: boolean;

  let formContent:
    | string
    | number
    | boolean
    | React.JSX.Element
    | Iterable<React.ReactNode>
    | null
    | undefined;

  function resetErrors() {
    validSubmission = true;
    setPasswordError('');
    setUsernameError('');
    setServiceNameError('');
  }

  function validateFormInputs() {
    if (serviceName === '') {
      setServiceNameError('Please enter your service name');
      validSubmission = false;
    }

    if (username === '') {
      setUsernameError('Please enter your username');
      validSubmission = false;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      validSubmission = false;
    }

    return validSubmission;
  }

  function resetFormValues() {
    setServiceName('');
    setUsername('');
    setPassword('');
  }

  function createFinalCredential() {
    const newCredential = {
      DateAdded: new Date(Date.now()),
      DateAddedMilliseconds: Date.now(),
      Service: serviceName,
      Username: username,
      Password: password
    };
    setTempCredential(newCredential);
    return newCredential;
  }

  function onSubmit() {
    resetErrors();
    if (!validateFormInputs()) return;

    const finalCredential = createFinalCredential();
    sendSingleCredential(finalCredential);
    enableAddNewButton();
    resetFormValues();
  }

  formContent = (
    <>
      <label
        htmlFor="new-credential-form"
        className="mt-10 block text-lg font-medium text-gray-700"
      >
        New Credential:
      </label>
      <div className="mt-6 w-full max-w-2xl mx-auto bg-gray-100 border border-gray-300 rounded-lg p-6 mb-4 shadow-sm">
        <form>
          <div className="mb-4">
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
              Service
            </label>
            <input
              id="service"
              value={serviceName}
              placeholder="Enter the name of a service"
              onChange={(ev) => setServiceName(ev.target.value)}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-4 focus:ring-blue-400 focus:border-blue-400"
            />
            {serviceNameError && <p className="text-red-500 text-sm mt-1">{serviceNameError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              value={username}
              placeholder="Enter username for service"
              onChange={(ev) => setUsername(ev.target.value)}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-4 focus:ring-blue-400 focus:border-blue-400"
            />
            {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              value={password}
              placeholder="Enter password here"
              onChange={(ev) => {
                const newPassword = ev.target.value;
                // Prevent spaces in the password
                if (!/\s/.test(newPassword)) {
                  setPassword(newPassword);
                }
              }}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-4 focus:ring-blue-400 focus:border-blue-400"
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <button
            onClick={onCancel}
            className="bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300"
            type="button"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300"
            type="button"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );

  return <div className="credentials-form">{formContent}</div>;
}
