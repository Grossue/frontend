import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const SignUp2Page = () => {
  const location = useLocation();
  const email = location.state?.email || ""; // signup1에서 전달된 이메일 받기
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const isValidPassword = (pw: string) => /^[A-Za-z\d@$!%*#?&]{8,20}$/.test(pw); // 간단한 정규식

  const isNextEnabled =
    isValidPassword(password) && password === confirmPassword;

  return (
    <Wrapper>
      <StepIndicator>
        <Step onClick={() => navigate("/signup1")}>1</Step>
        <Step active>2</Step>
        <Step onClick={() => navigate("/signup3")}>3</Step>
        <Step onClick={() => navigate("/signup4")}>4</Step>
      </StepIndicator>

      <Title>기본 정보 입력</Title>
      <Subtitle>아래 내용을 입력해 주세요.</Subtitle>

      <Label>이메일</Label>
      <ReadOnlyInput value={email} readOnly />

      <Label>비밀번호</Label>
      <Input
        type="password"
        placeholder="영문, 숫자, 특수문자 조합 8~20자"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        type="password"
        placeholder="비밀번호 재입력"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <NextButton
        //disabled={!isNextEnabled}
        onClick={() => navigate("/signup3", { state: { email, password } })}
      >
        다음
      </NextButton>
    </Wrapper>
  );
};

export default SignUp2Page;

const Wrapper = styled.div`
  max-width: 600px;
  height: 98vh;
  margin: 0 auto;
  padding: 32px 20px;
  position: relative;
`;

const StepIndicator = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const Step = styled.div<{ active?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  color: ${({ active }) => (active ? "white" : "#aaa")};
  background-color: ${({ active }) => (active ? "#1aa344" : "#ddd")};
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
  text-align: left;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 28px;
  text-align: left;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  display: block;
  text-align: left;
  color: #606076;
`;

const ReadOnlyInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  font-size: 14px;
  border: none;
  background: #f5f5f5;
  border-radius: 10px;
  margin-bottom: 16px;
  color: #444;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 12px;

  &::placeholder {
    color: #ccc;
  }
`;
const NextButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-top: 40px;
  padding: 14px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  background: #1aa344;
  color: #fff;
  cursor: "pointer";
`;
/*
const NextButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  margin-top: 40px;
  padding: 14px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  background: ${({ disabled }) => (disabled ? "#f3f3f3" : "#1aa344")};
  color: ${({ disabled }) => (disabled ? "#999" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
*/
