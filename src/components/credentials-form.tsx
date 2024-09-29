import React, { useState } from 'react';

export default function CredentialsForm() {
  const [serviceName, setServiceName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  let formContent:
    | string
    | number
    | boolean
    | React.JSX.Element
    | Iterable<React.ReactNode>
    | null
    | undefined;

  const onButtonClick = () => {
    // Reset errors before validation
    let hasError = false;
    setPasswordError('');
    setUsernameError('');

    // if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)) {
    //   setUsernameError('Please enter a valid email address');
    //   hasError = true;
    // }

    if (username === '') {
      setUsernameError('Please enter your username');
      hasError = true;
    }

    // Validate password
    if (password.length < 5) {
      setPasswordError('Password must be 5 characters or longer');
      hasError = true;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    if (username && password) {
      const singleCredential = {
        service: serviceName,
        username: username,
        password: password,
        dateAdded: Date.now()
      };

      console.log('Login Credentials:', singleCredential);
      setIsFormSubmitted(true);
      return singleCredential;
    }
  };

  if (!isFormSubmitted) {
    formContent = (
      <form>
        <input
          value={serviceName}
          placeholder="Enter the name of a service"
          onChange={(ev) => setServiceName(ev.target.value)}
        />

        <input
          value={username}
          placeholder="Enter username for service"
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <label className="errorLabel">{usernameError}</label>

        <input
          value={password}
          placeholder="Enter password here"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <label className="errorLabel">{passwordError}</label>

        <input onClick={onButtonClick} className={'inputButton'} type="button" value={'Submit'} />
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
          className={'editFormButton'}
          type="button"
          value={'Edit'}
        />
      </div>
    );
  }

  return <div className="credentials-form">{formContent}</div>;
}
