import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { motion } from "framer-motion";
import QuizToggle from "../components/reading/QuizToggle";
import QuizPanel from "../components/reading/QuizPanel";
import DictionaryToggle from "../components/reading/DictionaryToggle";
import DictionaryPanel from "../components/reading/DictionaryPanel";
import QnaToggle from "../components/reading/QnaToggle";
import QnaPanel from "../components/reading/QnaPanel";
import FONT from "../styles/font";
import { ReactComponent as Close } from "../assets/Close.svg";
import { ReactComponent as Book } from "../assets/Book.svg";
import { ReactComponent as UrlIcon } from "../assets/Url.svg";
import { ReactComponent as UrlToggle } from "../assets/UrlToggle.svg";
import { ReactComponent as Reward } from "../assets/Reward.svg";
import { ReactComponent as Student } from "../assets/Student.svg";
import { ReactComponent as Teacher } from "../assets/Teacher.svg";
import { ReactComponent as GreenSearch } from "../assets/GreenSearch.svg";
import { ReactComponent as Move } from "../assets/Move.svg";
import { ReactComponent as RecommandIcon } from "../assets/RecommandIcon.svg";
import { ReactComponent as Previous } from "../assets/Previous.svg";
import { ReactComponent as Next } from "../assets/Next.svg";
import { getArticle } from "../api/Reading";
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
const NewsMemory1GeneralPage = () => {
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
  const [currentPage, setCurrentPage] = useState(1);

  // data가 없으면 로딩 반환
  if (!memoryData) {
    return <NewsMemoryLoadingPage />;
  }

  const ai_result = memoryData.ai_result;
  const sessionId = memoryData.session_id;

  const paragraphs = [...ai_result.article.split("\n\n"), ai_result.summary];
  const totalPages = paragraphs.length;

  const handleWordClick = (word: Word) => setPopupContent(word);
  const closePopup = () => setPopupContent(null);

  const highlightWords = (text: string, words: Word[]) => {
    const terms = words.map((w) => w.term);
    const pattern = new RegExp(`(${terms.join("|")})`, "g");
    const parts = text.split(pattern);

    return parts.map((part, i) => {
      const wordMatch = words.find((w) => w.term === part);
      return wordMatch ? (
        <HighlightedWord key={i} onClick={() => handleWordClick(wordMatch)}>
          {part}
        </HighlightedWord>
      ) : (
        <span key={i}>{part}</span>
      );
    });
  };

  const handlePrev = () =>
    currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  return (
    <Container>
      <ArticleBox
        as={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
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

export default NewsMemory1GeneralPage;

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
const Line = styled.div`
  height: 1px;
  margin: 20px 0;
  border: 1px solid ${({ theme }) => theme.color.gray10};
`;
const ArticleBox = styled.div`
  width: 800px;
  margin: 50px auto;
  text-align: left;
  transition: transform 0.3s ease;
`;

const Article = styled.div`
  color: ${({ theme }) => theme.color.gray80};
  line-height: 160%;
  margin: 50px 0;
  margin-top: 60px;
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
const ArticleWrapper = styled.div`
  margin-top: 60px;
`;
const BubbleWrapperLeft = styled.div`
  display: flex;
  justify-content: flex-start; // 왼쪽 정렬
  align-items: flex-start;
  padding: 20px;
  border-radius: 20px;
  width: 100%;
`;
const BubbleWrapperRight = styled.div`
  display: flex;
  justify-content: flex-end; // 오른쪽 정렬
  align-items: flex-start;
  padding: 20px;
  border-radius: 20px;
  width: 100%;
`;

const Bubble = styled.div`
  background-color: #f3f3f3;
  color: #333;
  border-radius: 20px;
  padding: 14px 18px;
  max-width: 600px;
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-wrap;
  margin-left: 20px;
`;
const SummaryFinalBox = styled.div`
  background-color: #fff0f0;
  color: #ff4d4d;
  padding: 24px;
  border-radius: 16px;
  max-width: 600px;
  white-space: pre-wrap;
  margin-left: auto;
  margin-right: 0px;
`;
const SummaryFinalTitle = styled.div`
  margin-bottom: 12px;
`;
const SummaryFinalText = styled.div`
  line-height: 1.8;
  div {
    margin-bottom: 6px;
  }
`;
const SummaryIcon = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
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
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
`;

const ModalBox = styled.div`
  width: 600px;
  background: white;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  border: solid 4px #129f5d;
  p {
    margin: 5px 0;
  }
  #reward {
    margin-top: 10px;
  }
  #example {
    text-align: left;
    color: ${({ theme }) => theme.color.gray60};
  }
`;
const ModalButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.color.gray20};
  color: #fff;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 20px;
  border: none;
  transition: background 0.2s ease;
  &:hover {
    background-color: ${({ theme }) => theme.color.primary70};
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
  position: relative;

  #move {
    position: absolute;
    right: 10px;
  }
  &:hover {
    background-color: #eaeaec;
  }
`;

const ExampleBox = styled.div`
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
  position: relative;

  #move {
    position: absolute;
    right: 10px;
  }
  ul {
    padding-left: 20px;
  }
  li {
    margin-bottom: 12px; /* 항목 사이 간격 */
  }
`;
