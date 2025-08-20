import React from "react";
import styled from "styled-components";

interface ChatBubbleProps {
  type: "question" | "answer";
  avatar: string;
  text: string;
}

const ChatBubble = ({ type, avatar, text }: ChatBubbleProps) => {
  return (
    <BubbleWrapper type={type}>
      <Avatar src={avatar} />
      <Bubble type={type}>{text}</Bubble>
    </BubbleWrapper>
  );
};

export default ChatBubble;

const BubbleWrapper = styled.div<{ type: string }>`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-direction: ${({ type }) => (type === "answer" ? "row-reverse" : "row")};
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  margin: 0 12px;
`;

const Bubble = styled.div<{ type: string }>`
  background-color: ${({ type }) =>
    type === "question" ? "#e6f7ec" : "#fef1f1"};
  color: #333;
  border-radius: 20px;
  padding: 14px 18px;
  max-width: 600px;
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-wrap;
`;
