import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
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
import { ReactComponent as Teacher } from "../assets/Teacher.svg";
import { ReactComponent as Student } from "../assets/Student.svg";
import { ReactComponent as GreenSearch } from "../assets/GreenSearch.svg";
import { ReactComponent as Move } from "../assets/Move.svg";
import { ReactComponent as RecommandIcon } from "../assets/RecommandIcon.svg";
import { ReactComponent as Reward } from "../assets/Reward.svg";
import { ReactComponent as Previous } from "../assets/Previous.svg";
import { ReactComponent as Next } from "../assets/Next.svg";
import { getArticle } from "../api/Reading";
import NewsMemoryLoadingPage from "./NewsMemoryLoading";

interface Data {
  ai_result: AI_Result;
  session_id: string;
  level: string;
  article_type: string;
}
interface AI_Result {
  title: string;
  article: Article[];
  quiz: Quiz[];
  short_answer_question: Short_Answer_Question;
  thinking_question: Thinking_Question;
  url: Url[];
  summary: string;
  words: Word[];
  image: Image;
}
interface Article {
  who: string;
  content: string;
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

const NewsMemory1ScriptPage = () => {
  const location = useLocation();
  const [data, setData] = useState<Data | null>(null);

  // 우측 슬라이드 탭
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isDictOpen, setIsDictOpen] = useState(false);
  const [isQnaOpen, setIsQnaOpen] = useState(false);
  const isAnyOpen = isQuizOpen || isDictOpen || isQnaOpen;

  const [isUrlOpen, setIsUrlOpen] = useState(false);

  const [popupContent, setPopupContent] = useState<Word | null>(null);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getArticle("이차전지", "SCRIPT", "LEVEL1", true);
        console.log("기사 생성:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("기사 생성 오류", error);
      }
    };
    fetchData();
  }, []);

  // data가 없으면 로딩 반환
  if (!data) {
    return <NewsMemoryLoadingPage />;
  }

  const ai_result = data.ai_result;
  const sessionId = data.session_id;
  const chatPairs = [];
  for (let i = 0; i < ai_result.article.length; i += 2) {
    chatPairs.push(ai_result.article.slice(i, i + 2));
  }
  // 마지막 페이지에 요약용 null 추가
  chatPairs.push(null); // 마지막 인덱스엔 요약 페이지
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
    <Container isQuizOpen={isQuizOpen}>
      <ArticleBox isQuizOpen={isQuizOpen || isDictOpen}>
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
        <ArticleWrapper>
          {chatPairs[currentPage] ? (
            chatPairs[currentPage]!.map((item, index) => (
              <ChatBubbleWrapper key={index}>
                {item.who === "student" ? (
                  <>
                    <Student />
                    <GreenBubble style={FONT.md.regular}>
                      {highlightWords(item.content, ai_result.words)}
                    </GreenBubble>
                  </>
                ) : (
                  <>
                    <RedBubble style={FONT.md.regular}>
                      {highlightWords(item.content, ai_result.words)}
                    </RedBubble>
                    <Teacher />
                  </>
                )}
              </ChatBubbleWrapper>
            ))
          ) : (
            <BubbleWrapperRight>
              <SummaryFinalBox>
                <SummaryFinalTitle style={FONT.lg.bold}>
                  AI 요약 정리
                </SummaryFinalTitle>
                <SummaryFinalText style={FONT.md.regular}>
                  {highlightWords(ai_result.summary, ai_result.words)}
                </SummaryFinalText>
              </SummaryFinalBox>
              <SummaryIcon>
                <Teacher />
              </SummaryIcon>
            </BubbleWrapperRight>
          )}
        </ArticleWrapper>
        <Pagination>
          <PageButton
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            <Previous />
          </PageButton>
          <span>
            {currentPage + 1} / {chatPairs.length}
          </span>
          <PageButton
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, chatPairs.length - 1))
            }
            disabled={currentPage === chatPairs.length - 1}
          >
            <Next />
          </PageButton>
        </Pagination>
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

export default NewsMemory1ScriptPage;

const Container = styled.div<{ isQuizOpen: boolean }>`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.color.gray80};
  font-weight: 600;
  margin-bottom: 10px;
`;
const ArticleUrl = styled.div`
  color: ${({ theme }) => theme.color.gray40};
  cursor: pointer;
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
const ArticleBox = styled.div<{ isQuizOpen: boolean }>`
  width: 800px;
  margin: 50px auto;
  text-align: left;
  transition: transform 0.3s ease;
  transform: ${({ isQuizOpen }) =>
    isQuizOpen ? `translateX(-100px)` : "translateX(0)"};
`;
const Article = styled.div`
  color: ${({ theme }) => theme.color.gray80};
  line-height: 160%;
  margin: 30px 0;
`;
const ArticleWrapper = styled.div`
  margin-top: 60px;
`;

const BubbleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  border-radius: 20px;
  width: fit-content;
  max-width: 800px;
`;

const ChatBubbleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const GreenBubble = styled.div`
  background-color: #e7f8ec;
  color: #1b6f42;
  padding: 14px 18px;
  border-radius: 20px;
  font-size: 15px;
  line-height: 1.6;
  max-width: 600px;
  margin-left: 20px;
`;

const RedBubble = styled.div`
  background-color: #fff0f0;
  color: #ff4d4d;
  padding: 14px 18px;
  border-radius: 20px;
  font-size: 15px;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: 20px;
`;
const BubbleWrapperRight = styled.div`
  display: flex;
  justify-content: flex-end; // 오른쪽 정렬
  align-items: flex-start;
  padding: 20px;
  border-radius: 20px;
  width: 100%;
`;
const SummaryFinalBox = styled.div`
  background-color: #fff0f0;
  color: #ff4d4d;
  padding: 24px;
  border-radius: 16px;
  max-width: 600px;
  white-space: pre-wrap;
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
