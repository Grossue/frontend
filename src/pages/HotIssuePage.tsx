import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ReactComponent as GraySearch } from "../assets/GraySearch.svg";
import { ReactComponent as GreenSearch } from "../assets/GreenSearch.svg";
import { ReactComponent as Previous } from "../assets/Previous.svg";
import { ReactComponent as Next } from "../assets/Next.svg";
import { getArticleIssues, getArticleRecommend2 } from "../api/Reading";

interface TagButtonProps {
  active: boolean;
  isAi?: boolean;
}

const HotIssuePage: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("정치");
  const [issues, setIssues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const aiCache = React.useRef<string[] | null>(null);

  const navigate = useNavigate();

  const tags = [
    "정치",
    "IT/과학",
    "경제",
    "사회",
    "생활/문화",
    "세계",
    "💡AI 추천",
  ];

  // 오늘 날짜
  const today = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const day = days[today.getDay()];

  // 카테고리별 이슈 조회 API
  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      setError(null);
      try {
        if (selectedTag === "💡AI 추천") {
          // 캐시가 있으면 재사용
          if (aiCache.current) {
            setIssues(aiCache.current);
          } else {
            const res = await getArticleRecommend2();
            setIssues(res.data);
            aiCache.current = res.data; // 캐시에 저장
          }
        } else {
          const categoryMap: Record<string, string> = {
            정치: "POLITICS",
            경제: "ECONOMY",
            사회: "SOCIETY",
            "생활/문화": "LIFESTYLE",
            세계: "WORLD",
            "IT/과학": "IT_SCIENCE",
          };
          const apiCategory = categoryMap[selectedTag];
          const res = await getArticleIssues(apiCategory);
          setIssues(res.data);
        }
        setCurrentPage(1);
      } catch (err) {
        setError("이슈를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [selectedTag]);

  const handleSearch = () => {
    navigate("/loading", { state: { keyword } });
  };

  const handleIssueClick = (issue: string) => {
    navigate("/loading", { state: { keyword: issue } });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const itemsPerPage = 6;
  const totalPages = Math.ceil(issues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = issues.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <PageWrapper
      as={motion.div}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <DateText>
        {new Date().getMonth() + 1}월 {new Date().getDate()}일{" "}
      </DateText>
      <Title>오늘의 핫한 이슈는?</Title>
      <SearchWrapper>
        <SearchIcon />
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="직접 검색해 보세요"
        />
      </SearchWrapper>
      {/*<Button onClick={handleSearch}>검색</Button>*/}

      <TagList>
        {tags.map((tag) => (
          <TagButton
            key={tag}
            active={selectedTag === tag}
            isAi={tag === "💡AI 추천"}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </TagButton>
        ))}
      </TagList>

      {loading && <p>이슈 불러오는 중...</p>}
      {error && <p>{error}</p>}

      <IssueList>
        {currentItems.map((issue, i) => (
          <IssueItem
            key={i}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
            onClick={() => handleIssueClick(issue)}
          >
            {" "}
            <GreenSearch width={18} height={18} />
            {issue}
          </IssueItem>
        ))}
      </IssueList>
      {issues.length > 0 && (
        <Pagination>
          <PageButton disabled={currentPage === 1} onClick={handlePrev}>
            <Previous />
          </PageButton>
          <span>
            {currentPage} / {totalPages}
          </span>
          <PageButton
            disabled={currentPage === totalPages}
            onClick={handleNext}
          >
            <Next />
          </PageButton>
        </Pagination>
      )}
    </PageWrapper>
  );
};

export default HotIssuePage;

const PageWrapper = styled.div`
  padding: 60px 0;
  text-align: center;
`;

const DateText = styled.p`
  font-size: 18px;
  color: #7e7e8a;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 32px;
  margin-top: 20px;
`;
const SearchWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const SearchInput = styled.input`
  width: 530px;
  height: 48px;
  padding: 0 18px 0 44px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  background-color: #f5f5f7;
  color: #666;
  outline: none;
  margin-bottom: 24px;

  &::placeholder {
    color: ${({ theme }) => theme.color.gray40};
  }
  &:hover {
    background-color: #eee;
    transition: all 0.25s; /* 아이콘 색상 트랜지션 */
  }
  &:focus {
    background-color: #eee;
    transition: fill 0.25s ease; /* 아이콘 색상 트랜지션 */
  }

  /* input이 focus되면 아이콘 스타일 변경 */
  &:focus + svg {
    fill: #333; /* 아이콘 색상 진하게 */
  }
`;

const SearchIcon = styled(GraySearch)`
  position: absolute;
  top: 33%;
  left: 16px;
  transform: translateY(-50%); /* 세로 중앙 정렬 */
  width: 20px;
  height: 20px;
  pointer-events: none;
`;
const Button = styled.button`
  padding: 14px 20px;
  background-color: #17b169;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: #13995c;
  }
`;
const TagList = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
`;
const TagButton = styled.button<TagButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 2px solid
    ${({ isAi, theme }) => (isAi ? "#a855f7" : theme.color.gray20)}; // AI 추천이면 보라색, 아니면 회색
  background-color: ${({ active }) => (active ? "#22c55e" : "#fff")};
  color: ${({ active, isAi, theme }) =>
    active
      ? "#fff"
      : isAi
      ? "#9333ea"
      : theme.color.gray60}; // AI 추천이면 보라 글씨
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? "#16a34a" : "#f9fafb")};
  }
`;
const IssueList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const IssueItem = styled.div`
  background-color: #f5f5f7;
  padding: 12px 16px;
  border-radius: 12px;
  text-align: left;
  color: #333;
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin: 2px 0px;

  &:hover {
    background-color: #eaeaec;
  }
`;
const Pagination = styled.div`
  display: flex;
  align-items: center; // 세로 중앙 정렬
  justify-content: center; // 가로 중앙 정렬
  gap: 12px; // 요소 사이 간격
  margin-top: 20px;
  color: ${({ theme }) => theme.color.gray40};
  font-size: 14px;

  span {
    display: inline-block; // inline-block으로 span 크기 맞춤
    min-width: 40px; // 숫자 길이에 따라 간격 일정하게
    text-align: center; // 가운데 정렬
  }
`;
const PageButton = styled.button<{ disabled?: boolean }>`
  border: none;
  background: none;
  font-size: 18px;
  margin: 0 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.gray50};

  &:disabled {
    color: ${({ theme }) => theme.color.gray20};
    cursor: not-allowed;
  }
`;
