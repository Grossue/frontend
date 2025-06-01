import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import QuizToggle from "../components/reading/QuizToggle";
import QuizPanel from "../components/reading/QuizPanel";
import FONT from "../styles/font";

const IssueReading = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <Container>
      <IssueBox>
        <Title style={FONT.xxl}>최근 반도체 동향은 어떨까.</Title>
        <SubTitle style={FONT.xl}>총 5개의 기사를 요약했어요. {">"}</SubTitle>
        <hr />
        <Img>
          <img src="" />
        </Img>
        <Issue>
          최근 반도체 산업은 기술 혁신, 시장 성장, 공급망 변화 등 다양한 이슈로
          주목받고 있습니다. 2024년 글로벌 반도체 시장은 전년 대비 19% 성장하여
          약 6,269억 달러에 이를 것으로 예상됩니다. 특히 메모리 반도체 부문이
          81%의 높은 성장률을 기록하며 시장 성장을 주도할 것으로 보입니다.
        </Issue>
        <Issue>
          한국 반도체 산업 역시 회복세를 보이고 있습니다. 2023년에는 글로벌
          공급망 불안과 중국 경기 둔화 등의 영향으로 반도체 수출이 감소했지만,
          2024년 상반기에는 전년 동기 대비 52.2% 증가하며 반등에 성공했습니다.
          특히 메모리 반도체 수출이 78.9% 증가하며 AI 반도체 등의 신성장 동력을
          중심으로 시장이 다시 활기를 띠고 있습니다.
        </Issue>
        <Issue>
          주요 반도체 기업들도 변화에 대응하고 있습니다. 삼성전자는 메모리
          반도체 경쟁력을 강화하기 위해 경영진 개편을 단행했으며, 전영현 사장이
          메모리 사업부장 겸 공동 CEO로 임명되었습니다. 인텔은 포베로스(Foveros)
          및 EMIB(Embedded Multi-Die Interconnect Br최근 반도체 산업은 기술
          혁신, 시장 성장, 공급망 변화 등 다양한 이슈로 주목받고 있습니다.
          2024년 글로벌 반도체 시장은 전년 대비 19% 성장하여 약 6,269억 달러에
          이를 것으로 예상됩니다. 특히 메모리 반도체 부문이 81%의 높은 성장률을
          기록하며 시장 성장을 주도할 것으로 보입니다.
        </Issue>
      </IssueBox>
      <QuizToggle isActive={isQuizOpen} onClick={() => setIsQuizOpen(true)} />
      <QuizPanel isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </Container>
  );
};

export default IssueReading;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.color.gray80};
`;
const SubTitle = styled.div`
  color: ${({ theme }) => theme.color.gray40};
`;
const IssueBox = styled.div`
  width: 800px;
  height: 100vh;

  margin: 0 auto;
  margin-top: 50px;
  text-align: left;

  hr {
    margin: 20px 0;
    color: ${({ theme }) => theme.color.gray10};
  }
`;
const Img = styled.div`
  width: 800px;
  height: 320px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.gray10};

  img {
  }
`;
const Issue = styled.div`
  color: ${({ theme }) => theme.color.gray80};
  margin: 30px 0;
`;
