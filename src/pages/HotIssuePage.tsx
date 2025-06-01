import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HotIssuePage: React.FC = () => {
  const [keyword, setKeyword] = useState(""); // 검색어
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/loading", { state: { keyword } });
  };

  return (
    <PageWrapper>
      <DateText>1월 5일</DateText>
      <Title>오늘의 핫한 이슈는?</Title>
      <SearchInput
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="직접 검색해 보세요"
      />
      <Button onClick={handleSearch}>검색</Button>

      <TagList>
        <TagButton>정치</TagButton>
        <TagButton>경제</TagButton>
        <TagButton>사회</TagButton>
        <TagButton>생활/문화</TagButton>
        <TagButton>IT/과학</TagButton>
        <TagButton>세계</TagButton>
      </TagList>
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
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
`;

const SearchInput = styled.input`
  width: 360px;
  padding: 14px 18px;
  margin: 0px 3px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  background-color: #f5f5f7;
  color: #666;
  outline: none;
  margin-bottom: 24px;

  &::placeholder {
    color: #aaa;
  }
`;
const Button = styled.button`
  padding: 14px 18px;
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
  gap: 12px;
  flex-wrap: wrap;
`;

const TagButton = styled.button`
  background-color: #f2f2f4;
  border: none;
  padding: 8px 16px;
  border-radius: 18px;
  font-size: 14px;
  color: #4e4e57;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e5;
  }
`;
