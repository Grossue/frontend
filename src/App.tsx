import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import IssueReading from "./pages/IssueReadingPage";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <div className="App">
        <Routes>
          <Route path="/reading" element={<IssueReading />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
