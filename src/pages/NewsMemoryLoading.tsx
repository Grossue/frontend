import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import styled, { keyframes } from "styled-components";
import FONT from "../styles/font";
import { getArticleMemoryDetail } from "../api/Memory";

const loadingMessages = [
  "관련 기사를 검색하고 있어요 🔍 \n당신을 위한 맞춤형 정보를 찾는 중이에요.",
  "기사 분석 중입니다 🧠 \n내용을 바탕으로 어휘와 표현을 추출하고 있어요.",
  "퀴즈를 생성하고 있어요 📝 \n빈칸 채우기, 어휘 문제 등 다양하게 구성 중입니다!",
  "거의 다 됐어요! 🚀 \n곧 단어 설명과 문제를 확인할 수 있어요.",
  "우리 개발자들이 땀 흘리며 데이터 긁어오는 중…😅",
];

const NewsMemoryLoadingPage: React.FC = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // state 저장
  const state = location.state as {
    articleId: number;
    year: number;
    month: number;
    date: number;
    title: string;
  };

  // 로딩 메시지 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 뉴스메모리 상세 API 호출 후 level/type에 따라 라우팅
  useEffect(() => {
    if (!state) return;

    const fetchArticle = async () => {
      try {
        const res = await getArticleMemoryDetail(state?.articleId);
        if (res.isSuccess && res.data) {
          const { level: apiLevel, article_type } = res.data;

          if (apiLevel === "LEVEL1" && article_type === "SCRIPT") {
            navigate(
              `/newsmemory1/script/${state?.year}/${state?.month}/${state?.date}/${state?.articleId}`,
              { state: { memoryState: state, memoryData: res.data } }
            );
          } else if (apiLevel === "LEVEL1" && article_type === "GENERAL") {
            navigate(
              `/newsmemory1/general/${state?.year}/${state?.month}/${state?.date}/${state?.articleId}`,
              { state: { memoryState: state, memoryData: res.data } }
            );
          } else if (apiLevel === "LEVEL2" && article_type === "GENERAL") {
            navigate(
              `/newsmemory2/${state?.year}/${state?.month}/${state?.date}/${state?.articleId}`,
              { state: { memoryState: state, memoryData: res.data } }
            );
          } else {
            console.warn("알 수 없는 레벨/타입 조합:", apiLevel, article_type);
          }
        }
      } catch (err) {
        console.error("뉴스메모리 상세 API 실패:", err);
      }
    };

    fetchArticle();
  }, [state?.articleId, navigate, state?.year, state?.month, state?.date]);

  return (
    <Wrapper>
      <Dots>
        <Dot delay="0s" color="#d6f5e3" />
        <Dot delay="0.2s" color="#79d9a8" />
        <Dot delay="0.4s" color="#0fa958" />
      </Dots>
      <TextMain style={FONT.xxl.bold}>뉴스메모리 글을 가져오고 있어요</TextMain>
      <TextSub style={FONT.xl.bold}>{state?.title}</TextSub>
      <Sub style={FONT.xxl.bold}>
        {loadingMessages[index].split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </Sub>
    </Wrapper>
  );
};

export default NewsMemoryLoadingPage;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Dots = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 24px;
`;

const Dot = styled.div<{ delay: string; color: string }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  animation: ${bounce} 1.4s infinite;
  animation-delay: ${(props) => props.delay};
`;

const TextMain = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
`;

const TextSub = styled.div`
  font-size: 14px;
  color: "#17b169";
  margin: 20px 0px;
`;

const Sub = styled.div`
  font-size: 14px;
  color: #999;
`;
