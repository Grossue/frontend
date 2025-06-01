import React from "react";
import styled from "styled-components";
import FONT from "../../styles/font";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const QuizPanel: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <PanelWrapper isOpen={isOpen}>
      <PanelHeader>
        <CloseButton onClick={() => onClose()}>x</CloseButton>
      </PanelHeader>
      <PanelContent>
        {[1, 2, 3].map((i) => (
          <Question key={i} style={FONT.md}>
            <h4>
              {i}. 2024년 글로벌 반도체 시장 성장률은 전년 대비 몇 %로
              예상되는가?
            </h4>
            <input style={FONT.md} placeholder="label" />
            <input style={FONT.md} placeholder="label" />
            <input style={FONT.md} placeholder="label" />
          </Question>
        ))}
      </PanelContent>
      <SubmitButton>채점하기</SubmitButton>
    </PanelWrapper>
  );
};

export default QuizPanel;

const PanelWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.gray05};
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled.div`
  padding: 16px;
  font-weight: 600;
  font-size: 16px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 20px;
  background: transparent;
  border: none;
  font-size: 18px;
  color: #888;
  cursor: pointer;
`;

const PanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const Question = styled.div`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.color.gray60};
  text-align: left;

  h4 {
    margin-bottom: 10px;
  }

  input {
    display: block;
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 8px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.color.gray10};
  color: ${({ theme }) => theme.color.gray30};
  border: none;
  padding: 14px;
  font-size: 14px;
  border-radius: 12px;
  margin: 25px;
  cursor: pointer;
`;
