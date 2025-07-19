import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";
import FONT from "../../styles/font";
import { ReactComponent as Close } from "../../assets/Close.svg";
import { ReactComponent as CorrectIcon } from "../../assets/O.svg";
import { ReactComponent as WrongIcon } from "../../assets/X.svg";

interface Quiz {
  question: string;
  options: string[];
  correct_answer: number; // 정답 인덱스
}

interface QuizPanelProps {
  isOpen: boolean;
  onClose: () => void;
  quizList: Quiz[];
}

const QuizPanel: React.FC<QuizPanelProps> = ({ isOpen, onClose, quizList }) => {
  const theme = useTheme();

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    Array(quizList.length).fill(-1)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionChange = (quizIndex: number, optionIndex: number) => {
    if (!isSubmitted) {
      const newAnswers = [...selectedAnswers];
      newAnswers[quizIndex] = optionIndex;
      setSelectedAnswers(newAnswers);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleRetry = () => {
    setSelectedAnswers(Array(quizList.length).fill(-1));
    setIsSubmitted(false);
  };

  return (
    <PanelWrapper isOpen={isOpen}>
      <PanelHeader>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
      </PanelHeader>
      <PanelContent>
        {quizList.map((quiz, quizIndex) => (
          <Question key={quizIndex} style={FONT.md.medium}>
            <h4>
              {quizIndex + 1}. {quiz.question}
            </h4>
            {quiz.options.map((option, optionIndex) => {
              const isSelected = selectedAnswers[quizIndex] === optionIndex;
              const isCorrect = quiz.correct_answer === optionIndex;
              const isAnswerChecked = isSubmitted;

              let borderColor = "#ccc";
              let icon = null;

              if (isAnswerChecked) {
                if (isSelected && isCorrect) {
                  borderColor = theme.color.primary70;
                  icon = <CorrectIcon />;
                } else if (isSelected && !isCorrect) {
                  borderColor = theme.color.warning;
                  icon = <WrongIcon />;
                } else if (!isSelected && isCorrect) {
                  borderColor = theme.color.primary70;
                }
              }

              return (
                <OptionWrapper key={optionIndex}>
                  <OptionInput
                    isSelected={isSelected}
                    isCorrect={isCorrect}
                    isAnswerChecked={isAnswerChecked}
                    onClick={() => handleOptionChange(quizIndex, optionIndex)}
                    style={{ borderColor }}
                  >
                    {option}
                    {isAnswerChecked && isSelected && icon && (
                      <Icon>{icon}</Icon>
                    )}
                  </OptionInput>
                </OptionWrapper>
              );
            })}
          </Question>
        ))}
      </PanelContent>

      {isSubmitted ? (
        <SubmitButton onClick={handleRetry}>다시 풀기</SubmitButton>
      ) : (
        <SubmitButton onClick={handleSubmit}>채점하기</SubmitButton>
      )}
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
  top: 15px;
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
    background-color: ${({ theme }) => theme.color.gray80};
  }
`;

const OptionWrapper = styled.div`
  position: relative;
`;

const OptionInput = styled.div<{
  isSelected: boolean;
  isCorrect: boolean;
  isAnswerChecked: boolean;
}>`
  padding: 12px 14px;
  margin-bottom: 10px;
  background: #fff;
  border: 2px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.gray80};

  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.color.gray10};
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    background-color: #f0f0f0;
    font-weight: 600;
  `}
`;

const Icon = styled.span`
  position: absolute;
  right: 10px;
  top: 55%;
  transform: translateY(-50%);
`;
