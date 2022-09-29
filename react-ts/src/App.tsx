import React from 'react';
import './App.scss';
import {
  BrowserRouter, Link, Route, Routes,
} from 'react-router-dom';
import KeysDemo from './keys/KeysDemo';
import { SuspenseShowCase } from './suspense/suspense';

function Overview() {
  return (
    <>
      <h2>Demos:</h2>
      <ul>
        <li>
          <Link to="/react-keys">React Keys</Link>
        </li>
        <li>
          <Link to="/suspense">Suspense</Link>
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
        <Route path="/suspense" element={<SuspenseShowCase />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
