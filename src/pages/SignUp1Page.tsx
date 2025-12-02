import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getUserCheckEmail } from "../api/User"; // 경로 맞춰주세요
import { motion } from "framer-motion";

const SignUp1Page = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailMessage, setEmailMessage] = useState(""); // 이메일 검증 메시지
  const [isEmailValid, setIsEmailValid] = useState(false); // 사용 가능한 이메일 여부

  const navigate = useNavigate();

  // 이메일 중복 체크
  const handleCheckEmail = async () => {
    if (!email.includes("@")) {
      setEmailMessage("올바른 이메일을 입력해주세요.");
      setIsEmailValid(false);
      return;
    }

    try {
      setLoading(true);
      const res = await getUserCheckEmail(email);

      if (res?.isSuccess) {
        setIsEmailValid(true);
        setEmailMessage("사용 가능한 이메일입니다.");
      } else {
        setIsEmailValid(false);
        setEmailMessage(res?.message || "이미 가입된 이메일입니다.");
      }
    } catch (err) {
      console.error("이메일 인증 요청 오류:", err);
      setIsEmailValid(false);
      setEmailMessage("이메일 확인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const isNextEnabled = isEmailValid;

  return (
    <Wrapper>
      <StepIndicator>
        <Step active>1</Step>
        <Step onClick={() => navigate("/signup2")}>2</Step>
        <Step onClick={() => navigate("/signup3")}>3</Step>
        <Step onClick={() => navigate("/signup4")}>4</Step>
      </StepIndicator>
      <Title
        as={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        반가워요!
      </Title>
      <Subtitle
        as={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        본인 확인을 위해 이메일 인증을 진행해 주세요.
      </Subtitle>
      {/* 이메일 입력 */}
      <InputRow
        as={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
      >
        <Input
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SendButton onClick={handleCheckEmail} disabled={loading}>
          {loading ? "확인중..." : "확인"}
        </SendButton>
      </InputRow>
      {emailMessage && <Message isValid={isEmailValid}>{emailMessage}</Message>}
      <NextButton
        disabled={!isNextEnabled}
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
  margin-bottom: 8px;
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
const VerificationInput = styled(Input)`
  width: 200px;
  flex: unset;
  text-align: left;
`;
const Message = styled.p<{ isValid: boolean }>`
  font-size: 12px;
  margin: 4px 0 12px;
  color: ${({ isValid }) => (isValid ? "#1aa344" : "red")};
  text-align: left;
`;

const NextButton = styled.button<{ disabled?: boolean }>`
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
  background: ${({ disabled }) => (disabled ? "#ccc" : "#1aa344")};
  color: #fff;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
