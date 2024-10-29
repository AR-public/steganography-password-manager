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
  enableAddNewButton
}: ItemProps) {
  const [serviceName, setServiceName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serviceNameError, setServiceNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
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
    // setIsFormSubmitted(true);
    enableAddNewButton();
    resetFormValues();
  }

  // if (!isFormSubmitted) {
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
  // } else {
  //   formContent = (
  //     <div>
  //       <label className="submittedService">
  //         <b>Service:</b> {serviceName}{' '}
  //       </label>
  //       <label className="submittedUsername">
  //         <b>Username:</b> {username}{' '}
  //       </label>
  //       <label className="submittedPassword">
  //         <b>Password:</b> {password}{' '}
  //       </label>
  //       <input
  //         onClick={() => setIsFormSubmitted(false)}
  //         className="edit-form-button"
  //         type="button"
  //         value="Edit"
  //       />
  //     </div>
  //   );
  // }

  return <div className="credentials-form">{formContent}</div>;
}
