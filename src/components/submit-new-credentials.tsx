import React, { useState } from 'react';

interface TempCredentialRecord {
  CredentialID?: number;
  DateAdded?: Date;
  DateAddedMilliseconds: number;
  DateUpdated?: Date | null;
  DateUpdatedMilliseconds?: number | null;
  Service: string;
  Username: string;
  Password: string;
  DisplayOrder?: number;
}

interface ItemProps {
  childID: number | undefined;
  sendSingleCredential: (data: {
    childID: number | undefined;
    credential: TempCredentialRecord;
  }) => void;
}

let initialisedTempCredential: TempCredentialRecord = {
  DateAdded: new Date(Date.now()),
  DateAddedMilliseconds: 0,
  Service: '',
  Username: '',
  Password: ''
};

export default function AddNewCredentialsForm({ childID, sendSingleCredential }: ItemProps) {
  const [serviceName, setServiceName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serviceNameError, setServiceNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [tempCredential, setTempCredential] =
    useState<TempCredentialRecord>(initialisedTempCredential);

  let formContent:
    | string
    | number
    | boolean
    | React.JSX.Element
    | Iterable<React.ReactNode>
    | null
    | undefined;

  function createFinalCredential() {
    setTempCredential({
      DateAdded: new Date(Date.now()),
      DateAddedMilliseconds: Date.now(),
      Service: serviceName,
      Username: username,
      Password: password
    });
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

    createFinalCredential();
    sendSingleCredential({ childID, credential: tempCredential });
    setIsFormSubmitted(true);
  }

  if (!isFormSubmitted) {
    formContent = (
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
    formContent = (
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
          className="edit-form-button"
          type="button"
          value="Edit"
        />
      </div>
    );
  }

  return <div className="credentials-form">{formContent}</div>;
}
