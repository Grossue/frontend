import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../api/User";
import { ReactComponent as LoginLogo } from "../assets/Logo.svg";
import { ReactComponent as Kakao } from "../assets/Kakao.svg";
import { ReactComponent as Google } from "../assets/Google.svg";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postLogin({ email, password });
      localStorage.setItem("accessToken", response.data.accessToken); // 토큰 저장
      window.location.href = "/"; // 홈으로 이동
    } catch (err) {
      setError(true); // 에러 메시지 보여줌
    }
  };

  // 게스트 로그인
  const handleGuestLogin = async () => {
    try {
      const response = await postLogin({
        email: "test@naver.com",
        password: "test1234!",
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      window.location.href = "/";
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Container>
      <LoginBox
        as={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Logo>
          <LoginLogo />
        </Logo>
        <Form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
          />

          <PasswordWrapper>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
            />
            {password && (
              <ClearButton onClick={() => setPassword("")}>✕</ClearButton>
            )}
          </PasswordWrapper>

          {error && (
            <ErrorMessage>
              아이디 또는 비밀번호가 잘못되었습니다. <br />
              아이디와 비밀번호를 정확히 입력해 주세요.
            </ErrorMessage>
          )}

          <LoginButton type="submit">로그인</LoginButton>
        </Form>
        <JoinLink onClick={() => navigate("/signup1")}>
          이메일로 회원가입
        </JoinLink>
        <JoinLink onClick={handleGuestLogin}>테스트 계정으로 로그인</JoinLink>
      </LoginBox>
    </Container>
  );
};

export default LoginPage;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f6f6f6;
`;

export const LoginBox = styled.div`
  background: white;
  width: 360px;
  padding: 40px 24px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1aa344;
  font-family: "Pretendard", sans-serif;
`;

export const Slogan = styled.p`
  font-size: 14px;
  color: #3c3c3c;
  margin-top: 4px;
  margin-bottom: 32px;
`;

export const Form = styled.form`
  width: 100%;
`;

export const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  margin: 8px 0 4px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  margin: 5px 0;

  &:focus {
    outline: none;
    border-color: #1aa344;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  color: #f04444;
  font-size: 13px;
  margin-top: 8px;
`;

export const LoginButton = styled.button`
  width: 100%;
  background-color: #1aa344;
  color: white;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #178f3b;
  }
`;

export const Divider = styled.div`
  width: 100%;
  margin: 20px 0;
  text-align: center;
  font-size: 14px;
  color: #aaa;
  position: relative;

  &::before,
  &::after {
    content: "";
    height: 1px;
    background: #ddd;
    width: 42%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

export const SocialButton = styled.button<{
  kakao?: boolean;
  google?: boolean;
}>`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  background-color: ${({ kakao, google }) =>
    kakao ? "#FEE500" : google ? "#F5F5F5" : "#ccc"};
  color: ${({ kakao, google }) =>
    kakao ? "#191600" : google ? "#3c3c3c" : "#000"};
`;

export const KakaoIcon = styled.span`
  margin-right: 8px;
`;

export const GoogleIcon = styled.span`
  margin-right: 8px;
`;

export const JoinLink = styled.div`
  font-size: 14px;
  color: #777;
  margin-top: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #178f3b;
    transform: scale(1.01);
  }
`;
