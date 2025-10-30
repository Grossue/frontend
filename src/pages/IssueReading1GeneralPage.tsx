import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
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
import { ReactComponent as Reward } from "../assets/Reward.svg";
import { ReactComponent as Student } from "../assets/Student.svg";
import { ReactComponent as Teacher } from "../assets/Teacher.svg";
import { ReactComponent as GreenSearch } from "../assets/GreenSearch.svg";
import { ReactComponent as Move } from "../assets/Move.svg";
import { ReactComponent as RecommandIcon } from "../assets/RecommandIcon.svg";
import { ReactComponent as Previous } from "../assets/Previous.svg";
import { ReactComponent as Next } from "../assets/Next.svg";
import { getArticleFeedback, getArticleRecommend1 } from "../api/Reading";

interface Data {
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

const IssueReading1GeneralPage = () => {
  const location = useLocation();
  const locationState = location.state as { content?: Data };
  const [data, setData] = useState<Data | null>(locationState?.content || null);
  //const data = (location.state as { content: Data })?.content;
  //const ai_result = data.ai_result;
  //const sessionId = data.session_id;

  // 우측 슬라이드 탭
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isDictOpen, setIsDictOpen] = useState(false);
  const [isQnaOpen, setIsQnaOpen] = useState(false);
  const isAnyOpen = isQuizOpen || isDictOpen || isQnaOpen;

  // 출처 url
  const [isUrlOpen, setIsUrlOpen] = useState(false);

  // 단어 팝업 모달창
  const [popupContent, setPopupContent] = useState<Word | null>(null);

  // 뒤로가기 추천기사
  const [recommendedArticles, setRecommendedArticles] = useState<string[]>([]);
  const [recLoading, setRecLoading] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);

  // 퀴즈 리워드 모달창
  const [isRewardOpen, setIsRewardOpen] = useState(false);
  const [rewardCnt, setRewardCnt] = useState<number | null>(null);

  const handleRewardOpen = (cnt: number) => {
    setRewardCnt(cnt);
    setIsRewardOpen(true);
  };
  const handleRewardClose = () => {
    setIsRewardOpen(false);
    setRewardCnt(null);
  };
  // 퀴즈 생각해보기 피드백 API 연동
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleThinkingFeedback = async (answer: string) => {
    try {
      const res = await getArticleFeedback(answer, sessionId, false);
      if (res?.data) {
        setFeedback(res.data); // API에서 내려오는 피드백 본문
        setIsThinkingOpen(true); // 모달 열기
      }
    } catch (error) {
      console.error("피드백 API 호출 실패", error);
      setFeedback("피드백을 불러오는 중 오류가 발생했습니다.");
      setIsThinkingOpen(true);
    }
  };

  // 퀴즈 생각해보기 예시답안 모달창
  const [isThinkingOpen, setIsThinkingOpen] = useState(false);
  const handleThinkingOpen = () => setIsThinkingOpen(true);
  const handleThinkingClose = () => setIsThinkingOpen(false);

  // 뒤로가기 추천창
  const navigate = useNavigate();
  const [isRecommandOpen, setIsRecommandOpen] = useState(false);
  const handleRecommandClose = () => setIsRecommandOpen(false);

  // 페이지네이션 - 현재 페이지 표시
  const [currentPage, setCurrentPage] = useState(1);

  // 뒤로가기 추천기사 API 연동
  useEffect(() => {
    if (!data?.ai_result?.title) return;

    const fetchRecommendedArticles = async () => {
      if (!ai_result?.title) return;

      setRecLoading(true);
      setRecError(null);

      try {
        const res = await getArticleRecommend1(ai_result.title); // API 호출
        if (res && res.data) {
          setRecommendedArticles(res.data); // 배열만 넣기
        } else {
          setRecommendedArticles([]); // 안전하게 빈 배열
        }
      } catch (err) {
        console.error("추천기사 불러오기 실패", err);
        setRecError("추천 기사를 불러오는 중 오류가 발생했습니다.");
        setRecommendedArticles([]);
      } finally {
        setRecLoading(false);
      }
    };

    fetchRecommendedArticles();
  }, []);

  // 뒤로가기 모달창 띄우기
  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
    const handlePopState = (event: PopStateEvent) => {
      window.history.pushState(null, "", window.location.pathname);

      //event.preventDefault();
      setIsRecommandOpen(true); // 모달 열기
      // 실제 페이지 이동은 막기
      console.log("뒤로가기");
      navigate(1); // 뒤로가기 취소하고 현재 페이지 유지
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  // 새로고침 시 sessionStorage에서 불러오기
  useEffect(() => {
    if (!data) {
      const savedData = sessionStorage.getItem("issueData");
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    } else {
      sessionStorage.setItem("issueData", JSON.stringify(data));
    }
  }, [data]);
  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>; // 로딩 UI
  }

  const ai_result = data.ai_result;
  const sessionId = data.session_id;

  // 단어 모달창 띄우기
  const handleWordClick = (word: Word) => {
    setPopupContent(word);
  };

  // 단어 모달창 닫기
  const closePopup = () => {
    setPopupContent(null);
  };

  // 단어 하이라이트
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

  const paragraphs = [...ai_result.article.split("\n\n"), ai_result.summary]; // 마지막에 요약 추가
  const totalPages = paragraphs.length;

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // 뒤로가기 추천기사 화면 이동
  const handleIssueClick = (issue: string) => {
    navigate("/loading", { state: { keyword: issue } });
  };

  return (
    <Container isQuizOpen={isQuizOpen}>
      <ArticleBox
        isQuizOpen={isQuizOpen || isDictOpen}
        as={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
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
      <QuizToggle
        isActive={isQuizOpen} // 색깔용
        isAnyOpen={isAnyOpen} // 밀림 효과용
        onClick={() => {
          setIsQuizOpen(true);
          setIsQnaOpen(false);
          setIsDictOpen(false);
        }}
      />
      <QnaToggle
        isActive={isQnaOpen}
        isAnyOpen={isAnyOpen} // 밀림 효과용
        onClick={() => {
          setIsQuizOpen(false);
          setIsQnaOpen(true);
          setIsDictOpen(false);
        }}
      />
      <DictionaryToggle
        isActive={isDictOpen} // 색깔용
        isAnyOpen={isAnyOpen} // 밀림 효과용
        onClick={() => {
          setIsQuizOpen(false);
          setIsQnaOpen(false);
          setIsDictOpen(true);
        }}
      />

      {/* 우측탭 */}
      <QuizPanel
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        quizList={ai_result.quiz}
        short_answer_question={ai_result.short_answer_question}
        thinking_question={ai_result.thinking_question}
        onReward={handleRewardOpen} // 채점 완료 시 호출
        onThinking={handleThinkingOpen} // 채점 완료 시 호출
        onThinkingFeedback={handleThinkingFeedback}
      />
      <DictionaryPanel
        isOpen={isDictOpen}
        onClose={() => setIsDictOpen(false)}
      />
      <QnaPanel
        isOpen={isQnaOpen}
        onClose={() => setIsQnaOpen(false)}
        sessionId={sessionId}
      />

      {/* AI 용어 설명 모달창 */}
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

      {/* 리워드 모달창 */}
      {isRewardOpen && (
        <ModalOverlay onClick={handleRewardClose}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <h2>🎉 축하합니다! 🎉</h2>
            <p style={FONT.xxl.medium}>{rewardCnt} 리워드를 획득했습니다!</p>
            <Reward id="reward" />
            <ModalButton onClick={handleRewardClose}>확인</ModalButton>
          </ModalBox>
        </ModalOverlay>
      )}

      {/* 생각해보기 모달창 */}
      {isThinkingOpen && (
        <ModalOverlay onClick={handleThinkingClose}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <RecommandIcon />
            <p style={FONT.xxl.bold}>좋은 접근이에요! 👍</p>
            <p style={FONT.xl.regular}>
              혹시 다른 표현 방식이 궁금하다면 한번 살펴보면 좋을 것 같아요.
            </p>
            <p id="example" style={FONT.xl.semibold}>
              📌 피드백
            </p>
            <ExampleBox>
              <ReactMarkdown>
                {feedback || "피드백을 불러오는 중입니다..."}
              </ReactMarkdown>
            </ExampleBox>
            <p id="example" style={FONT.xl.semibold}>
              📌 예시 답안
            </p>
            <ExampleBox>
              <ul>
                {ai_result.thinking_question.example_answers.map(
                  (answer, idx) => (
                    <li key={idx}>{answer}</li>
                  )
                )}
              </ul>
            </ExampleBox>
            <ModalButton onClick={handleThinkingClose}>닫기</ModalButton>
          </ModalBox>
        </ModalOverlay>
      )}

      {/* 뒤로가기 추천기사 모달창 */}
      {isRecommandOpen && (
        <ModalOverlay onClick={handleRecommandClose}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <RecommandIcon />
            <p style={FONT.xxl.bold}>잠깐! 혹시 놓치고 가는 뉴스는 없나요?</p>
            <p style={FONT.xl.regular}>
              🎯 당신에게 딱 맞는 뉴스 주제를 골라봤어요.
            </p>

            {recLoading && <p>추천 기사 불러오는 중...</p>}
            {recError && <p>{recError}</p>}

            <IssueList>
              {recommendedArticles.map((title, idx) => (
                <IssueItem key={idx} onClick={() => handleIssueClick(title)}>
                  <GreenSearch width={18} height={18} />
                  {title}
                  <Move id="move" />
                </IssueItem>
              ))}
            </IssueList>

            <ModalButton onClick={() => navigate("/")}>괜찮아요</ModalButton>
          </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default IssueReading1GeneralPage;

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
  margin-top: 50px;
`;

const BubbleWrapperLeft = styled.div`
  display: flex;
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
  gap: 10px;
  cursor: pointer;
  margin: 2px 0px;
  position: relative;
  white-space: pre-line;
  margin-bottom: 10px;

  #move {
    position: absolute;
    right: 10px;
  }
  ul {
    padding-left: 20px;
  }
  li {
    margin-bottom: 12px;
  }

  max-height: 150px; /* 원하는 높이 */
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
