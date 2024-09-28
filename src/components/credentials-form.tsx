import React, { useState } from 'react';

export default function CredentialsForm() {
  const [serviceName, setServiceName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onButtonClick = () => {
    setEmailError('');
    setPasswordError('');

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('please enter a valid email address');
      return;
    }

    if (password.length < 5) {
      setPasswordError('password must be 6 character or longer');
    }

    if (email === '') {
      setEmailError('Please enter your email');
    }

    if (password === '') {
      setPasswordError('Please enter a password');
    }

    if (passwordError != '' || emailError != '') {
      return;
    }

    if (email && password) {
      const credentials = {
        username: { email },
        password: { password }
      };

      console.log('Login Credentials:', credentials);

      return credentials;
    }
  };

  return (
    <div className="credentials-form">
      <form>
        <input
          value={serviceName}
          placeholder="Enter the name of a service"
          onChange={(ev) => setServiceName(ev.target.value)}
        />

        <input
          value={email}
          placeholder="Enter email address here"
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <label className="errorLabel">{emailError}</label>

        <input
          value={password}
          placeholder="Enter password here"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <label className="errorLabel">{passwordError}</label>

        <input onClick={onButtonClick} className={'inputButton'} type="button" value={'Submit'} />
      </form>
    </div>
  );
}
