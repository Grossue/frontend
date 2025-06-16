import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HotIssue() {
  const categories = ['정치', '경제', '사회', '생활/문화', 'IT/과학', '세계'];
  const navigate = useNavigate();
  const today = new Date();
  const dateString = `${today.getMonth() + 1}월 ${today.getDate()}일`;

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate('/loading', { state: { keyword: searchQuery } });
    }
  };

  const handleCategoryClick = (cat) => {
    let exampleTopic = '';
    switch (cat) {
      case '정치':
        exampleTopic = '총선 결과';
        break;
      case '경제':
        exampleTopic = '삼성 주가';
        break;
      case '사회':
        exampleTopic = '청년 실업률';
        break;
      case '생활/문화':
        exampleTopic = '부산국제영화제';
        break;
      case 'IT/과학':
        exampleTopic = 'AI 기술 발전';
        break;
      case '세계':
        exampleTopic = '미국 대선';
        break;
      default:
        exampleTopic = cat;
    }
    setSearchQuery(exampleTopic);
  };

  return (
    <div className="max-w-3xl mx-auto font-sans px-5 py-10">
      <p className="text-gray-500 text-sm text-center mb-1">{dateString}</p>
      <h2 className="text-2xl font-bold text-center mb-6">오늘의 핫한 이슈는?</h2>

      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          stroke="#999"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          className="mr-2 cursor-pointer"
          onClick={handleSearch}
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="직접 검색해 보세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="bg-transparent outline-none flex-1 text-sm"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white hover:bg-gray-100"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HotIssue;
