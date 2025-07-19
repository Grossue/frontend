import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import IssueReadingPage from "./pages/IssueReadingPage";
import HotIssuePage from "./pages/HotIssuePage";
import IssueLoadingPage from "./pages/IssueLoadingPage";
import LoginPage from "./pages/LoginPage";
import SignUp1Page from "./pages/SignUp1Page";
import SignUp2Page from "./pages/SignUp2Page";
import SignUp3Page from "./pages/SignUp3Page";
import SignUp4Page from "./pages/SignUp4Page";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HotIssuePage />} />
          <Route path="/reading" element={<IssueReadingPage />} />
          <Route path="/loading" element={<IssueLoadingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup1" element={<SignUp1Page />} />
          <Route path="/signup2" element={<SignUp2Page />} />
          <Route path="/signup3" element={<SignUp3Page />} />
          <Route path="/signup4" element={<SignUp4Page />} />
        </Routes>
        <Sidebar />
      </div>
    </BrowserRouter>
  );
}

export default App;
