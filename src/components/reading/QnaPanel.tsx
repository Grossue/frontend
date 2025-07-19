import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import FONT from "../../styles/font";
import { ReactComponent as Close } from "../../assets/Close.svg";
import { ReactComponent as BotIcon } from "../../assets/BotIcon.svg"; // 봇 아이콘 파일 교체 가능
import { getArticleQna } from "../../api/Reading";

interface QnaItem {
  question: string;
  answer: string;
}

interface QnaPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}

const QnaPanel: React.FC<QnaPanelProps> = ({ isOpen, onClose, sessionId }) => {
  const [input, setInput] = useState("");
  const [qnaList, setQnaList] = useState<QnaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [qnaList, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const question = input.trim();
    setQnaList((prev) => [...prev, { question, answer: "" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await getArticleQna(sessionId, question);
      const answer = response.data;

      setQnaList((prev) =>
        prev.map((item, i) =>
          i === prev.length - 1 ? { ...item, answer } : item
        )
      );
    } catch (err) {
      setQnaList((prev) =>
        prev.map((item, i) =>
          i === prev.length - 1
            ? { ...item, answer: "답변을 불러오는 데 실패했어요." }
            : item
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <PanelWrapper isOpen={isOpen}>
      <PanelHeader>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
      </PanelHeader>
      <ChatContainer ref={scrollRef}>
        <BotRow>
          <BotBubble>
            <BotIconBox>
              <BotIcon />
            </BotIconBox>
            <BotMessage style={FONT.sm.medium}>
              글에 대해서 나와 이야기 하고 싶은게 있다면 말해줘.
            </BotMessage>
          </BotBubble>
        </BotRow>

        {qnaList.map((item, index) => (
          <React.Fragment key={index}>
            <UserRow>
              <UserMessage style={FONT.sm.medium}>{item.question}</UserMessage>
            </UserRow>
            {item.answer && (
              <BotRow>
                <BotBubble>
                  <BotIconBox>
                    <BotIcon />
                  </BotIconBox>
                  <BotMessage style={FONT.sm.medium}>{item.answer}</BotMessage>
                </BotBubble>
              </BotRow>
            )}
          </React.Fragment>
        ))}

        {loading && (
          <LoadingRow>
            <BotIconBox>
              <BotIcon />
            </BotIconBox>
            <ThreeDots>
              <span />
              <span />
              <span />
            </ThreeDots>
          </LoadingRow>
        )}
      </ChatContainer>

      <InputBar>
        <Input
          type="text"
          placeholder="질문해 보세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </InputBar>
    </PanelWrapper>
  );
};

export default QnaPanel;
const PanelWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.gray05};
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease;
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

const ChatContainer = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
`;

const BotRow = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const BotBubble = styled.div`
  display: flex;
  align-items: flex-start;
`;

const BotIconBox = styled.div`
  margin-right: 8px;
  svg {
    width: 24px;
    height: 24px;
  }
`;

const BotMessage = styled.div`
  background-color: ${({ theme }) => theme.color.gray10};
  color: ${({ theme }) => theme.color.gray80};
  padding: 10px 14px;
  border-radius: 10px;
  max-width: 250px;
  text-align: left;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const UserMessage = styled.div`
  background-color: ${({ theme }) => theme.color.primary70};
  color: white;
  padding: 10px 14px;
  border-radius: 10px;
  max-width: 250px;
  text-align: left;
`;

const InputBar = styled.div`
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.color.gray10};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray30};
  font-size: 14px;
`;

const LoadingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ThreeDots = styled.div`
  display: flex;
  gap: 4px;

  span {
    width: 6px;
    height: 6px;
    background-color: ${({ theme }) => theme.color.gray40};
    border-radius: 50%;
    animation: blink 1.4s infinite both;
  }

  span:nth-child(2) {
    animation-delay: 0.2s;
  }

  span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes blink {
    0%,
    80%,
    100% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
  }
`;
