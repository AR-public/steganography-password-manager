import React, { useEffect, useState } from 'react';
import { SingleCredentialRecord } from '../screens/Screen-Encode-New';

interface ItemProps {
  childID: number | undefined;
  existingCredential: SingleCredentialRecord;
  sendSingleCredential: (credential: SingleCredentialRecord) => void;
  deleteSingleCredential: (credentialID: number) => void;
}

let initialisedTempCredential: SingleCredentialRecord = {
  CredentialID: Math.random(),
  DateAdded: new Date(Date.now()),
  DateAddedMilliseconds: 0,
  Service: '',
  Username: '',
  Password: ''
};

export default function ExistingCredentialForms({
  existingCredential,
  sendSingleCredential,
  deleteSingleCredential
}: ItemProps) {
  const [serviceName, setServiceName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serviceNameError, setServiceNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [tempCredential, setTempCredential] =
    useState<SingleCredentialRecord>(initialisedTempCredential);

  useEffect(() => {
    if (existingCredential) {
      setTempCredential(existingCredential);
      setServiceName(existingCredential.Service);
      setUsername(existingCredential.Username);
      setPassword(existingCredential.Password);
      setIsFormSubmitted(true);
    }
  }, []);

  function createFinalCredential() {
    const editedCredential = {
      CredentialID: existingCredential.CredentialID,
      DateAdded: existingCredential ? existingCredential.DateAdded : new Date(Date.now()),
      DateAddedMilliseconds: existingCredential
        ? existingCredential.DateAddedMilliseconds
        : Date.now(),
      Service: serviceName,
      Username: username,
      Password: password
    };

    setTempCredential(editedCredential);
    return editedCredential;
  }

  function onSubmit() {
    let hasError = false;
    setPasswordError('');
    setUsernameError('');
    setServiceNameError('');

    if (serviceName === '') {
      setServiceNameError('Please enter your service name');
      hasError = true;
    }

    if (username === '') {
      setUsernameError('Please enter your username');
      hasError = true;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    if (
      serviceName !== existingCredential?.Service ||
      username !== existingCredential?.Username ||
      password !== existingCredential?.Password
    ) {
      const finalCredential = createFinalCredential();
      sendSingleCredential(finalCredential);
    }

    setIsFormSubmitted(true);
  }

  function onDelete() {
    deleteSingleCredential(existingCredential.CredentialID);
  }

  if (!isFormSubmitted) {
    return (
      <div className="mt-10 w-full max-w-2xl mx-auto bg-gray-100 border border-gray-300 rounded-lg p-6 mb-4 shadow-sm">
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
                if (!/\s/.test(newPassword)) {
                  setPassword(newPassword);
                }
              }}
              className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-4 focus:ring-blue-400 focus:border-blue-400"
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300"
            type="button"
          >
            Submit
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="mt-10 w-full max-w-2xl mx-auto bg-gray-100 border border-gray-300 rounded-lg p-6 mb-4 shadow-sm flex flex-col items-center text-center">
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2 service font-semibold text-blue-600">
            {serviceName}
          </p>
          <p className="text-lg font-semibold text-gray-800 mb-2">
            <b>Username:</b> {username}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <b>Password:</b> {password}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsFormSubmitted(false)}
            className="bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-300"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
