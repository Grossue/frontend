import React from "react";
import styled from "styled-components";
import FONT from "../../styles/font";

type Props = {
  isActive: boolean;
  onClick: () => void;
};

const QuizToggle: React.FC<Props> = ({ isActive, onClick }) => {
  return (
    <Tab style={FONT.md} isActive={isActive} onClick={onClick}>
      QUIZ
    </Tab>
  );
};

export default QuizToggle;

const Tab = styled.button<{ isActive: boolean }>`
  position: fixed;
  width: 70px;
  height: 38px;
  top: 100px;
  right: ${({ isActive }) => (isActive ? "400px" : "0")};
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
