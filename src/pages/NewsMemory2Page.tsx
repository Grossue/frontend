import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import FONT from "../styles/font";
import { ReactComponent as Close } from "../assets/Close.svg";
import { ReactComponent as Book } from "../assets/Book.svg";
import { ReactComponent as UrlIcon } from "../assets/Url.svg";
import { ReactComponent as UrlToggle } from "../assets/UrlToggle.svg";
import NewsMemoryLoadingPage from "./NewsMemoryLoading";

interface MemoryState {
  year: number;
  month: number;
  date: number;
  articleId: number;
  title: string;
}

interface MemoryData {
  ai_result: AI_Result;
  session_id: string;
  level: string;
  article_type: string;
}
interface AI_Result {
  title: string;
  article: string;
  quiz: Quiz[];
  short_answer_question: Short_Answer_Question;
  thinking_question: Thinking_Question;
  url: Url[];
  summary: string;
  words: Word[];
  image: Image;
}
interface Quiz {
  question: string;
  options: string[];
  correct_answer: number;
}
interface Short_Answer_Question {
  example_answers: string[];
  question: string;
}
interface Thinking_Question {
  example_answers: string[];
  question: string;
}
interface Url {
  title: string;
  url: string;
}
interface Word {
  term: string;
  explanation: string;
}
interface Image {
  image_desc: string;
  image_source: string;
  image_url: string;
}

const NewsMemory2Page = () => {
  const location = useLocation();
  const locationState = location.state as {
    memoryState?: MemoryState;
    memoryData?: MemoryData;
  };

  const [memoryState, setMemoryState] = useState<MemoryState | null>(
    locationState?.memoryState || null
  );
  const [memoryData, setMemoryData] = useState<MemoryData | null>(
    locationState?.memoryData || null
  );

  // 뉴스메모리 읽은 날짜
  const formattedDate = memoryState
    ? `${memoryState.year}년 ${memoryState.month}월 ${memoryState.date}일`
    : "";

  const [isUrlOpen, setIsUrlOpen] = useState(false);

  const [popupContent, setPopupContent] = useState<Word | null>(null);

  // data가 없으면 로딩 반환
  if (!memoryData) {
    return <NewsMemoryLoadingPage />;
  }

  const ai_result = memoryData.ai_result;
  const sessionId = memoryData.session_id;

  const handleWordClick = (word: Word) => {
    setPopupContent(word);
  };

  const closePopup = () => {
    setPopupContent(null);
  };

  const highlightWords = (text: string, words: Word[]) => {
    const terms = words.map((w) => w.term);
    const pattern = new RegExp(`(${terms.join("|")})`, "g");

    const parts = text.split(pattern);

    return parts.map((part, i) => {
      const wordMatch = words.find((w) => w.term === part);
      if (wordMatch) {
        return (
          <HighlightedWord key={i} onClick={() => handleWordClick(wordMatch)}>
            {part}
          </HighlightedWord>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <Container>
      <ArticleBox>
        <Header>
          <HeaderTitle style={FONT.xl.bold}>뉴스메모리</HeaderTitle>
          {formattedDate && <HeaderDate>{formattedDate}</HeaderDate>}
        </Header>
        <Title style={FONT.xxl.bold}>{ai_result.title}</Title>
        <ArticleUrl
          style={FONT.xl.bold}
          onClick={() => setIsUrlOpen((prev) => !prev)}
        >
          총 {ai_result.url.length}개의 기사를 요약했어요.{" "}
          <UrlToggle
            id="toggle"
            style={{
              transform: isUrlOpen ? "rotate(0deg)" : "rotate(-90deg)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
          />
        </ArticleUrl>

        {isUrlOpen && (
          <UrlBox style={FONT.md.bold}>
            {ai_result.url.map((item, index) => (
              <Url key={index}>
                <UrlIcon id="icon" />
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </Url>
            ))}
          </UrlBox>
        )}
        <Line />
        <Img>
          <img src={ai_result.image.image_url} alt="기사 이미지" />
          <Caption>
            {ai_result.image.image_desc} <br />
            출처: {ai_result.image.image_source}
          </Caption>
        </Img>
        <Article>
          {ai_result.article.split("\n\n").map((paragraph, i) => (
            <p key={i}>
              {highlightWords(paragraph, ai_result.words)}
              <br />
              <br />
            </p>
          ))}
        </Article>
        <Line />
        <SummaryTitle style={FONT.xxl.bold}>
          <span>
            <Book />
          </span>
          {"  "}
          AI 요약
        </SummaryTitle>
        <SummaryBox>
          <Summary style={FONT.md.bold}>{ai_result.summary}</Summary>
        </SummaryBox>
      </ArticleBox>
      {popupContent && (
        <PopupOverlay onClick={closePopup}>
          <PopupBox onClick={(e) => e.stopPropagation()}>
            <PopupTitle style={FONT.xl.bold}>
              {popupContent.term}
              <PopupAI style={FONT.sm.bold}>AI 용어 설명</PopupAI>
            </PopupTitle>
            <PopupText style={FONT.lg.bold}>
              : {popupContent.explanation}
            </PopupText>
            <PopupClose onClick={closePopup}>
              <Close />
            </PopupClose>
          </PopupBox>
        </PopupOverlay>
      )}
    </Container>
  );
};

export default NewsMemory2Page;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const Header = styled.div`
  width: 800px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.div`
  color: ${({ theme }) => theme.color.gray40};
`;

const HeaderDate = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.gray40};
`;
const Title = styled.div`
  color: ${({ theme }) => theme.color.gray80};
  font-weight: 600;
  margin-bottom: 10px;
`;
const ArticleUrl = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.color.gray40};
  #toggle {
    vertical-align: middle;
  }
`;
const UrlBox = styled.div`
  cursor: pointer;
`;
const Url = styled.div`
  width: fit-content;
  background-color: ${({ theme }) => theme.color.gray05};
  border-radius: 30px;
  padding: 5px 15px;
  margin: 10px 0px;
  color: ${({ theme }) => theme.color.gray40};

  #icon {
    //margin-top: 10px;
    vertical-align: middle;
    margin-right: 6px;
  }
  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.color.primary70};
      text-decoration: underline;
    }
  }
`;
const ArticleBox = styled.div`
  width: 800px;
  margin: 50px auto;
  text-align: left;
  transition: transform 0.3s ease;
`;
const Img = styled.div`
  width: 800px;
  height: 400px;
  border-radius: 12px;
  margin-bottom: 10px;

  img {
    width: 800px;
    height: 400px;
    border-radius: 12px;
    object-fit: cover;
    //object-position: top;
  }
`;
const Caption = styled.div`
  margin: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray40};
  text-align: left;
`;
const Article = styled.div`
  color: ${({ theme }) => theme.color.gray80};
  line-height: 160%;
  margin: 50px 0;
`;
const Line = styled.div`
  height: 1px;
  margin: 20px 0;
  border: 1px solid ${({ theme }) => theme.color.gray10};
`;
const SummaryTitle = styled.div`
  color: ${({ theme }) => theme.color.primary70};
  display: flex;
  align-items: center;
  span {
    transform: translateY(10%);
    margin-right: 10px;
  }
`;
const SummaryBox = styled.div`
  width: 800px;
  border-radius: 20px;
  margin: 20px 0;
  margin-bottom: 100px;
  padding: 30px 20px;
  background-color: ${({ theme }) => theme.color.gray05};
`;
const Summary = styled.div`
  color: ${({ theme }) => theme.color.gray80};
`;

const HighlightedWord = styled.span`
  background-color: ${({ theme }) => theme.color.primary10}; // 원하는 색
  color: ${({ theme }) => theme.color.primary70};
  cursor: pointer;
  font-weight: 600;
  padding: 0 4px;
  transition: background 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.color.primary20};
  }
`;
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const PopupBox = styled.div`
  position: relative;
  background: white;
  padding: 24px;
  border-radius: 20px;
  max-width: 360px;
  width: 80%;
  text-align: left;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const PopupTitle = styled.div`
  display: flex;
  align-items: baseline; /* 아래줄 맞춤 */
  margin-bottom: 12px;
  color: ${({ theme }) => theme.color.primary70};
`;
const PopupAI = styled.span`
  margin-left: 5px;
  color: ${({ theme }) => theme.color.gray30};
`;
const PopupText = styled.div`
  color: ${({ theme }) => theme.color.gray50};
`;

const PopupClose = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
`;
