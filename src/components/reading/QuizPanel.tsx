import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";
import FONT from "../../styles/font";
import { ReactComponent as Close } from "../../assets/Close.svg";
import { ReactComponent as CorrectIcon } from "../../assets/O.svg";
import { ReactComponent as WrongIcon } from "../../assets/X.svg";
import { putArticleReward } from "../../api/Reading";
import { useUser } from "../../context/UserContext";

interface Quiz {
  question: string;
  options: string[];
  correct_answer: number; // 정답 인덱스
}
interface Short_Answer_Question {
  example_answers: string[];
  question: string;
}
interface Thinking_Question {
  example_answers: string[];
  question: string;
}
interface QuizPanelProps {
  isOpen: boolean;
  onClose: () => void;
  quizList: Quiz[];
  short_answer_question: Short_Answer_Question;
  thinking_question: Thinking_Question;
  onReward?: (rewardCnt: number) => void;
  onThinking?: () => void;
  onThinkingFeedback?: (answer: string) => void; // 생각해보기 피드백
}

const QuizPanel: React.FC<QuizPanelProps> = ({
  isOpen,
  onClose,
  quizList,
  short_answer_question,
  thinking_question,
  onReward,
  onThinking,
  onThinkingFeedback,
}) => {
  const theme = useTheme();

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    Array(quizList.length).fill(-1)
  );

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [shortAnswer, setShortAnswer] = useState("");
  const [thinkingAnswer, setThinkingAnswer] = useState("");

  const handleOptionChange = (quizIndex: number, optionIndex: number) => {
    if (!isSubmitted) {
      const newAnswers = [...selectedAnswers];
      newAnswers[quizIndex] = optionIndex;
      setSelectedAnswers(newAnswers);
    }
  };

  const { refreshUser } = useUser();

  const handleSubmit = async () => {
    setIsSubmitted(true);

    // 객관식 정답 개수 계산
    const correctCnt = quizList.reduce((acc, quiz, index) => {
      return acc + (selectedAnswers[index] === quiz.correct_answer ? 1 : 0);
    }, 0);
    const totalCnt = quizList.length;

    // 리워드 API 연동
    try {
      const res = await putArticleReward(correctCnt, totalCnt);
      const rewardCnt = res.data;

      if (onReward) onReward(rewardCnt);
      refreshUser(); // Sidebar 자동 업데이트
      console.log("리워드 지급 완료", rewardCnt);
    } catch (error) {
      console.error("리워드 지급 실패", error);
    }

    // 생각해보기 피드백 API 요청
    if (onThinkingFeedback && thinkingAnswer.trim()) {
      onThinkingFeedback(thinkingAnswer.trim());
    }
  };

  const handleRetry = () => {
    setSelectedAnswers(Array(quizList.length).fill(-1));
    setIsSubmitted(false);
  };

  // 생각해보기 예시답안
  const [isThinking, setIsThinking] = useState(false);
  const handleThinking = () => {
    setIsThinking(true);
    if (onThinking) onThinking(); // 예시답안 모달 호출
  };

  return (
    <PanelWrapper isOpen={isOpen}>
      <PanelHeader>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
      </PanelHeader>
      <PanelContent>
        {/* 기존 선다형 퀴즈 */}
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

        {/* 단답형 문제 */}
        <Question style={FONT.md.medium}>
          <h4>4. [단답형] {short_answer_question.question}</h4>
          <textarea
            placeholder="여기에 답을 입력하세요."
            value={shortAnswer}
            onChange={(e) => setShortAnswer(e.target.value)}
            style={{
              width: "100%",
              minHeight: "80px",
              borderRadius: "8px",
              border: `2px solid ${isSubmitted ? "#9333ea" : "#ccc"}`, // 보라색으로 변경
              padding: "10px",
              transition: "border 0.3s",
              color: `${isSubmitted ? "#9333ea" : "#000"}`,
              fontFamily: "Pretendard",
            }}
          />
          {isSubmitted && (
            <ExampleBox>
              <strong>예시 답안: </strong>
              {short_answer_question.example_answers.join(", ")}
            </ExampleBox>
          )}
        </Question>

        {/* 생각 질문 */}
        <Question style={FONT.md.medium}>
          <h4>5. [생각해보기] {thinking_question.question}</h4>
          <textarea
            placeholder="자유롭게 생각을 적어보세요."
            value={thinkingAnswer}
            onChange={(e) => setThinkingAnswer(e.target.value)}
            style={{
              width: "100%",
              minHeight: "80px",
              borderRadius: "8px",
              border: `2px solid ${isSubmitted ? "#9333ea" : "#ccc"}`, // 보라색으로 변경
              padding: "10px",
              transition: "border 0.3s",
              color: `${isSubmitted ? "#9333ea" : "#000"}`,
              fontFamily: "Pretendard",
            }}
          />
          {isSubmitted && (
            <ExampleBox>
              <strong onClick={handleThinking}>✅ 예시 답안 보기</strong>
              {/*<ul>
                {thinking_question.example_answers.map((ans, idx) => (
                  <li key={idx}>{ans}</li>
                ))}
              </ul>*/}
            </ExampleBox>
          )}
        </Question>
      </PanelContent>

      {isSubmitted ? (
        <SubmitButton onClick={handleRetry}>
          {/* 위에 disabled 추가하기*/}
          채점완료
        </SubmitButton>
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
const ExampleBox = styled.div`
  margin-top: 8px;
  padding: 10px;
  background: ${({ theme }) => theme.color.gray10};
  border-radius: 6px;
  color: ${({ theme }) => theme.color.warning};
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  cursor: pointer;
  ul {
    padding-left: 20px;
  }
  strong {
    color: #888;
  }
`;
