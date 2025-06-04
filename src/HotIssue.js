import React, { useState, useEffect } from 'react';
import newsData from './data/news.json';

function HotIssue() {
  const categories = ['정치', '경제', '사회', '생활/문화', 'IT/과학', '세계'];
  const articlesPerPage = 7;

  const today = new Date();
  const dateString = `${today.getMonth() + 1}월 ${today.getDate()}일`;

  const [selectedCategory, setSelectedCategory] = useState('정치');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const categoryFiltered = newsData.filter(
      (article) => article.category === selectedCategory
    );

    const searchFiltered = categoryFiltered.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredArticles(searchFiltered);
    setTotalPages(Math.ceil(searchFiltered.length / articlesPerPage));
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              selectedCategory === cat
                ? 'border-gray-700 bg-gray-100 font-bold'
                : 'border-gray-300 bg-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {paginatedArticles.length === 0 ? (
        <p className="text-center text-gray-400">관련 기사가 없어요.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {paginatedArticles.map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-gray-100 rounded-lg px-4 py-3 shadow-sm text-black no-underline hover:bg-gray-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                stroke="#2e8b57"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                className="mr-2"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="text-sm">{article.title}</span>
            </a>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center items-center gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="text-lg disabled:text-gray-300"
        >
          &lt;
        </button>
        <span className="text-sm text-gray-500">{`${currentPage} / ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="text-lg disabled:text-gray-300"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default HotIssue;
