<<<<<<< HEAD
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import IssueReadingPage from "./pages/IssueReadingPage";
import HotIssuePage from "./pages/HotIssuePage";
import IssueLoadingPage from "./pages/IssueLoadingPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HotIssuePage />} />
          <Route path="/reading" element={<IssueReadingPage />} />
          <Route path="/loading" element={<IssueLoadingPage />} />
        </Routes>
        <Sidebar />
      </div>
    </BrowserRouter>
=======
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
>>>>>>> d5d8cd5e7aab8188b05a46905603343ec22d0923
  );
}

export default App;
