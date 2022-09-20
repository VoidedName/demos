import React from 'react';
import './App.scss';
import {
  BrowserRouter, Link, Route, Routes,
} from 'react-router-dom';
import KeysDemo from './keys/KeysDemo';

function Overview() {
  return (
    <>
      <h2>Demos:</h2>
      <ul>
        <li>
          <Link to="/react-keys">React Keys</Link>
        </li>
      </ul>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/react-keys" element={<KeysDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
