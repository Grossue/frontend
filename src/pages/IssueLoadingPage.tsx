import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import FONT from "../styles/font";
import { getArticleGeneral } from "../api/Reading";

const loadingMessages = [
  "관련 기사를 검색하고 있어요 🔍 \n당신을 위한 맞춤형 정보를 찾는 중이에요.",
  "기사 분석 중입니다 🧠 \n내용을 바탕으로 어휘와 표현을 추출하고 있어요.",
  "퀴즈를 생성하고 있어요 📝 \n빈칸 채우기, 어휘 문제 등 다양하게 구성 중입니다!",
  "거의 다 됐어요! 🚀 \n곧 단어 설명과 문제를 확인할 수 있어요.",
  "우리 개발자들이 땀 흘리며 데이터 긁어오는 중…",
];

interface Data {
  ai_result: [];
  session_id: string;
}

const IssueLoadingPage: React.FC = () => {
  const [index, setIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = (location.state as { keyword: string })?.keyword;
  const [data, setData] = useState<Data[]>([]); // data

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 기사 생성 api 연동
  useEffect(() => {
    const fetchData = async () => {
      if (!keyword.trim()) return; // 아무것도 입력안할때

      try {
        // 테스트용
        const response = await getArticleGeneral("관세", "LEVEL1", true);
        console.log("기사 생성:", response.data);
        setData(response.data);

        navigate("/reading", {
          state: { content: response.data },
        });
      } catch (error) {
        console.error("기사 생성 오류", error);
      }
    };
    fetchData();
  }, [data, keyword, navigate]);

  return (
    <Wrapper>
      <Dots>
        <Dot delay="0s" color="#d6f5e3" />
        <Dot delay="0.2s" color="#79d9a8" />
        <Dot delay="0.4s" color="#0fa958" />
      </Dots>
      <TextMain style={FONT.xxl}>글을 가져오고 있어요</TextMain>
      <TextSub style={FONT.xl}>{keyword}</TextSub>
      <Sub style={FONT.xxl}>
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

export default IssueLoadingPage;
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
  color: #999;
`;

const Sub = styled.div`
  font-size: 14px;
  color: #999;
`;
