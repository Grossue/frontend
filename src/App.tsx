import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import IssueReading2Page from "./pages/IssueReading2Page";
import HotIssuePage from "./pages/HotIssuePage";
import IssueLoadingPage from "./pages/IssueLoadingPage";
import LoginPage from "./pages/LoginPage";
import SignUp1Page from "./pages/SignUp1Page";
import SignUp2Page from "./pages/SignUp2Page";
import SignUp3Page from "./pages/SignUp3Page";
import SignUp4Page from "./pages/SignUp4Page";
import IssueReading1GeneralPage from "./pages/IssueReading1GeneralPage";
import IssueReading1ScriptPage from "./pages/IssueReading1ScriptPage";
import MyPage from "./pages/MyPage";
import RankingPage from "./pages/RankingPage";
import VocabularyPage from "./pages/VocabularyPage";
import NewsMemory1GeneralPage from "./pages/NewsMemory1GeneralPage";
import NewsMemory1ScriptPage from "./pages/NewsMemory1ScriptPage";
import NewsMemory2Page from "./pages/NewsMemory2Page";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HotIssuePage />} />
          <Route
            path="/reading1/general"
            element={<IssueReading1GeneralPage />}
          />
          <Route
            path="/reading1/script"
            element={<IssueReading1ScriptPage />}
          />
          <Route path="/reading2" element={<IssueReading2Page />} />
          <Route path="/loading" element={<IssueLoadingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup1" element={<SignUp1Page />} />
          <Route path="/signup2" element={<SignUp2Page />} />
          <Route path="/signup3" element={<SignUp3Page />} />
          <Route path="/signup4" element={<SignUp4Page />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route
            path="/newsmemory1/general"
            element={<NewsMemory1GeneralPage />}
          />
          <Route
            path="/newsmemory1/script"
            element={<NewsMemory1ScriptPage />}
          />
          <Route path="/newsmemory2" element={<NewsMemory2Page />} />
        </Routes>
        <Sidebar />
      </div>
    </BrowserRouter>
  );
}

export default App;
