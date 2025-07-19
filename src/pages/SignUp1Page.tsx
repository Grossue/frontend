import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SignUp1Page = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const handleSend = () => {
    if (!email.includes("@")) return;
    setIsSent(true);
    // 실제 인증 요청 로직 연결
  };

  const isNextEnabled = isSent && code.trim().length > 0;

  return (
    <Wrapper>
      <StepIndicator>
        <Step active>1</Step>
        <Step onClick={() => navigate("/signup2")}>2</Step>
        <Step onClick={() => navigate("/signup3")}>3</Step>
        <Step onClick={() => navigate("/signup4")}>4</Step>
      </StepIndicator>

      <Title>반가워요!</Title>
      <Subtitle>본인 확인을 위해 이메일 인증을 진행해 주세요.</Subtitle>

      <InputRow>
        <Input
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SendButton onClick={handleSend}>전송</SendButton>
      </InputRow>

      <Input
        placeholder="인증번호 입력"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <NextButton
        //disabled={!isNextEnabled}
        onClick={() => navigate("/signup2", { state: { email } })}
      >
        다음
      </NextButton>
    </Wrapper>
  );
};

export default SignUp1Page;

const Wrapper = styled.div`
  max-width: 600px;
  height: 98vh;
  margin: 0 auto;
  padding: 32px 20px;
  padding: 32px 20px 80px;
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

const InputRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`;

const Input = styled.input`
  flex: 1;
  padding: 14px 16px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  &::placeholder {
    color: #ccc;
  }
`;

const SendButton = styled.button`
  padding: 0 14px;
  border-radius: 10px;
  background-color: #f5f5f5;
  font-size: 14px;
  border: none;
  color: #555;
  cursor: pointer;
`;
const NextButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
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
