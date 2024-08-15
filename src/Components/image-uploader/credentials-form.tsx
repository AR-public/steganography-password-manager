import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onButtonClick = () => {
    setEmailError('');
    setPasswordError('');

    if ('' === email) {
      setEmailError('Please enter your email');
      return;
    }

    if ('' === password) {
      setPasswordError('Please enter a password');
      return;
    }
    if (password.length < 5) {
      setPasswordError('password must be 6 character or longer');
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('please enter a valid email address');
      return;
    }

    if (email) {
      console.log('valid email provided');

      const credentials = {
        username: { email },
        password: { password }
      };

      console.log(credentials);

      return credentials;
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form>
        <div className="user-box">
          <input
            value={email}
            placeholder="Enter email address here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={'user-box'}
          />

          <label className="errorLabel">{emailError}</label>
        </div>
        <div className="user-box">
          <input
            value={password}
            placeholder="Enter password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'user-box'}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <input onClick={onButtonClick} className={'inputButton'} type="button" value={'Submit'} />
      </form>
    </div>
  );
}
