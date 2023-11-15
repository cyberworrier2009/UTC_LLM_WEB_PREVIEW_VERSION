import React from 'react';
import logo from './logo.svg';
// import './App.scss';
import { GoogleLogin } from '@react-oauth/google';
function App() {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (<div className="App">
      <header className="App-header">
       {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage}></GoogleLogin> */}
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>);
}
export default App;
