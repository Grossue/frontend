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
  );
}

export default App;
