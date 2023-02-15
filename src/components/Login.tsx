import React, { useState } from 'react';
import reactLogo from './../assets/react.svg'
import './Components.css'
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setInfoUser: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ setInfoUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInfoUser(username, password);

    navigate('/employee')
  };

  

  return (
    <div>
      <h1>¡Te damos la bienvenida!</h1>
      <br />
      <div>
        <img src="/vite.svg" className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <br />
      <form onSubmit={handleSubmit} className="login">
        <label>
          <p className='textbox'>Username:</p>
          <input onPaste={(e) => { e.preventDefault(); return false}} onCopy={(e) => { e.preventDefault(); return false}} type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
        <p className='textbox'>Password:</p>
          <input onPaste={(e) => { e.preventDefault(); return false}} onCopy={(e) => { e.preventDefault(); return false}} type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <button className='buttonForm' type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;