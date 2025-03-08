import React from 'react';
/**
 * @returns {*} JSX Component
 */
function Login() {
  const [credentials, setCredentials] =
    React.useState({email: '', password: ''});
  const [user, setUser] = React.useState(undefined);

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    setCredentials({...credentials, [name]: value});
  };

  const logout = () => {
    setUser(undefined);
  };

  const login = (event) => {
    event.preventDefault();
    setUser(undefined);
    fetch('http://localhost:3010/api/v0/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setUser(json);
        })
        .catch((err) => {
          alert('Error logging in, please try again');
        });
  };

  return (
    <div>
      <h2>CSE186 Tested Login</h2>
      <input
        name="email"
        type="email"
        placeholder="EMail"
        onChange={handleInputChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleInputChange}
      />
      <button onClick={login}>Login</button>
      <p/>
      <button disabled={!user} onClick={logout}>Logout</button>
      <p/>
      <label>{user ? user.name : 'Logged out'}</label>
    </div>
  );
}

export default Login;
