// @ts-nocheck
import { useState } from "react"
import Sqldata from "./components/Sqldata";

function App() {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const [authText, setAuthText] = useState('');
  const [errorText, setErrorText] = useState('');

  const name = {
    username: 'John'
  }

  const handleLogin = async() => {
    try {
      const res = await fetch(`http://localhost:8888/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        credentials: 'include',
        body: JSON.stringify(name)
      })
      if (res.ok) {
        const loginResult = await res.json();
        console.log(loginResult);
        setAuthText(loginResult);
        setErrorText('');
      } else {
        if (res?.status === 403 || res?.status === 500) {
          const loginResult = await res.json();
          setErrorText(loginResult)
        }
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.log('There was a SyntaxError', error);
      } else {
        console.log('There was an error', error);
        setErrorText(error);

      }
    }
  }

  const handleGetData = async() => {
    try {
      setLoad(true)
      const res = await fetch(`http://localhost:8888/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        credentials: 'include'
      });
      if (res.ok) {
        const result = await res.json();
        setUsers(result);
        setErrorText('');
      } else {
        if (res?.status === 403 || res?.status === 500) {
          setLoad(false)
          const loginResult = await res.json();
          setErrorText(loginResult)
        }
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.log('There was a SyntaxError', error);
      } else {
        console.log('There was an error', error);
        setErrorText(error)
      }
    } finally {
      setTimeout(() => {
        setLoad(false)
      }, 1000)
    }
  }

  const handleLogout = async() => {
    try {
      const res = await fetch(`http://localhost:8888/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        credentials: 'include'
      })
      if (res.ok) {
        const loginResult = await res.json();
        console.log(loginResult);
        setAuthText(loginResult);
      } else {
        if (res?.status === 403 || res?.status === 500) {
          const loginResult = await res.json();
          setErrorText(loginResult)
        }
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.log('There was a SyntaxError', error);
      } else {
        console.log('There was an error', error);
        setErrorText(error);
      }
    }
  }

  return (
    <>
    <div>
    {authText === '' ?
    <div>
      <p><b>Authorization status:</b></p>
      <p>you are not authorized</p>
    </div>
    :
    <div>
      <p><b>Authorization status:</b></p>
      <p>{authText}</p>
    </div>
    }
    <div style={{display: 'flex', gap: '5px'}}>
      <button className="btn" onClick={handleLogin}>Login</button>
      <button className="btn" onClick={handleGetData}>Get data</button>
      <button className="btn" onClick={handleLogout}>Logout</button>
    </div>
    {errorText !== '' ?
      <p style={{color: 'red', fontFamily: 'monospace'}}>
        {errorText}
      </p>
      : null}
    {load ? <p>Loading...</p> : <Sqldata users={users} />}
    </div>
    </>
  )
}

export default App
