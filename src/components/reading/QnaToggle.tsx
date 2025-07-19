import React from "react";
import styled from "styled-components";
import { ReactComponent as QnaIcon } from "../../assets/Qna.svg"; // 아이콘은 네가 사용하는 스타일에 맞춰 교체해줘
import FONT from "../../styles/font";

interface QnaToggleProps {
  isActive: boolean;
  isAnyOpen: boolean;
  onClick: () => void;
}

const QnaToggle: React.FC<QnaToggleProps> = ({
  isActive,
  isAnyOpen,
  onClick,
}) => {
  return (
    <Tab
      style={FONT.md.medium}
      isActive={isActive}
      isAnyOpen={isAnyOpen}
      onClick={onClick}
    >
      {/*<QnaIcon />*/}
      <span>Q&A</span>
    </Tab>
  );
};

export default QnaToggle;

const Tab = styled.button<{ isActive: boolean; isAnyOpen: boolean }>`
  position: fixed;
  width: 70px;
  height: 38px;
  top: 150px;
  right: ${({ isAnyOpen }) => (isAnyOpen ? "400px" : "0")};
  transition: right 0.3s ease;
  background: ${({ theme, isActive }) =>
    isActive ? theme.color.primary70 : theme.color.gray05};
  color: ${({ theme, isActive }) =>
    isActive ? theme.color.gray00 : theme.color.gray40};
  border-radius: 8px 0 0 8px;
  border: ${({ theme, isActive }) => (isActive ? theme.color.gray10 : "none")};
  cursor: pointer;
  z-index: 1001;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.08);
`;
