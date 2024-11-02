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

  // Use useEffect to initialize state based on existingCredential, avoiding an infinite loop
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
    // Reset errors before validation
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
      <form>
        <input
          value={serviceName}
          placeholder="Enter the name of a service"
          onChange={(ev) => setServiceName(ev.target.value)}
        />
        <label className="errorLabel">{serviceNameError}</label>

        <input
          value={username}
          placeholder="Enter username for service"
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <label className="errorLabel">{usernameError}</label>

        <input
          value={password}
          placeholder="Enter password here"
          onChange={(ev) => {
            const newPassword = ev.target.value;
            // Prevent spaces in the password
            if (!/\s/.test(newPassword)) {
              setPassword(newPassword);
            }
          }}
        />
        <label className="errorLabel">{passwordError}</label>

        <input onClick={onSubmit} className={'inputButton'} type="button" value={'Submit'} />
      </form>
    );
  } else {
    return (
      <div>
        <label className="submittedService">
          <b>Service:</b> {serviceName}{' '}
        </label>
        <label className="submittedUsername">
          <b>Username:</b> {username}{' '}
        </label>
        <label className="submittedPassword">
          <b>Password:</b> {password}{' '}
        </label>
        <input
          onClick={() => setIsFormSubmitted(false)}
          className="edit-credential-button"
          type="button"
          value="Edit"
        />
        <input
          onClick={onDelete}
          className="delete-credential-button"
          type="button"
          value="Delete"
        />
      </div>
    );
  }
}
