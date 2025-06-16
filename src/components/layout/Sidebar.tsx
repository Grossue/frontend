import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Left } from "../../assets/Left.svg";
import { ReactComponent as Right } from "../../assets/Right.svg";
import { ReactComponent as Home } from "../../assets/Home.svg";
import { ReactComponent as Dic } from "../../assets/Dictionary.svg";
import { ReactComponent as Memory } from "../../assets/Memory.svg";
import { ReactComponent as MyPage } from "../../assets/MyPage.svg";
import { ReactComponent as Logout } from "../../assets/Logout.svg";
import { ReactComponent as Logo } from "../../assets/GrossueLogo.svg";
import FONT from "../../styles/font";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <Container isOpen={isOpen}>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <Left /> : <Right />}
      </ToggleButton>

      <Profile isOpen={isOpen}>
        <img src="/grossueLogo.png" alt="프로필 사진" />
        <div>
          <span id="name" style={FONT.lg}>
            김구름
          </span>
          <span id="level" style={FONT.md}>
            새싹 * 0점
          </span>
        </div>
      </Profile>

      <MenuItem isOpen={isOpen} onClick={() => navigate("/")}>
        <Home />
        <span style={FONT.md}>홈</span>
      </MenuItem>
      <MenuItem isOpen={isOpen} onClick={() => navigate("/dictionary")}>
        <Dic />
        <span style={FONT.md}>단어장</span>
      </MenuItem>
      <MenuItem isOpen={isOpen} onClick={() => navigate("/newsmemory")}>
        <Memory />
        <span style={FONT.md}>나의 뉴스 메모리</span>
      </MenuItem>
      <MenuItem isOpen={isOpen} onClick={() => navigate("/mypage")}>
        <MyPage />
        <span style={FONT.md}>마이페이지</span>
      </MenuItem>

      <Spacer />

      <MenuItem isOpen={isOpen}>
        <Logout />
        <span style={FONT.md}>로그아웃</span>
      </MenuItem>

      <Footer isOpen={isOpen}>
        <Logo />
      </Footer>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => (isOpen ? "240px" : "72px")};
  transition: width 0.3s ease;
  background-color: ${({ theme }) => theme.color.gray05};
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 16px 16px;
  border-right: 1px solid ${({ theme }) => theme.color.gray10};
`;

const ToggleButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.color.gray50};
`;

const Profile = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  margin-bottom: 24px;

  img {
    width: 52px;
    height: 52px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.gray20};
  }

  div {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray80};
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #name {
    color: ${({ theme }) => theme.color.gray80};
  }
  #level {
    color: ${({ theme }) => theme.color.gray40};
  }

  ${({ isOpen }) =>
    !isOpen &&
    css`
      display: none;

      img,
      span {
        display: none;
      }
    `}
`;

const MenuItem = styled.div<{ isOpen: boolean }>`
  z-index: 10000;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  color: ${({ theme }) => theme.color.gray60};
  cursor: pointer;
  font-size: 14px;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.color.gray10};
  }

  svg {
    flex-shrink: 0;
  }

  ${({ isOpen }) =>
    !isOpen &&
    css`
      justify-content: center;
      margin: 5px 0px;

      span {
        display: none;
      }
    `}
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const Footer = styled.div<{ isOpen: boolean }>`
  color: ${({ theme }) => theme.color.gray30};
  font-size: 12px;
  text-align: center;
  padding: 12px 0;

  ${({ isOpen }) =>
    !isOpen &&
    css`
      display: none;
    `}
`;
