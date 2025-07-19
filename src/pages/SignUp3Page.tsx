import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const SignUp3Page = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // 전달된 이메일 받기
  const password = location.state?.password || "";

  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(null);
  const [birthYear, setBirthYear] = useState("");

  const handleNext = () => {
    if (nickname && gender && birthYear !== "선택") {
      navigate("/signup4", {
        state: { email, password, nickname, gender, birthYear },
      });
    }
  };

  return (
    <Wrapper>
      <StepIndicator>
        <Step onClick={() => navigate("/signup1")}>1</Step>
        <Step onClick={() => navigate("/signup2")}>2</Step>
        <Step active>3</Step>
        <Step onClick={() => navigate("/signup4")}>4</Step>
      </StepIndicator>

      <Title>프로필 설정</Title>
      <Subtitle>아래 내용을 입력해 주세요.</Subtitle>

      <ProfileImageWrapper>
        <ImageCircle>
          <UploadIcon>📷</UploadIcon>
        </ImageCircle>
      </ProfileImageWrapper>

      <Form>
        <Label>닉네임</Label>
        <NicknameRow>
          <Input
            placeholder="8자 이하, 특수문자 제외"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <CheckButton>확인</CheckButton>
        </NicknameRow>
        {nickname && /[^a-zA-Z0-9가-힣]/.test(nickname) && (
          <ErrorText>특수문자는 포함할 수 없어요.</ErrorText>
        )}

        <Label>성별</Label>
        <GenderRow>
          <GenderButton
            onClick={() => setGender("MALE")}
            selected={gender === "MALE"}
          >
            남성
          </GenderButton>
          <GenderButton
            onClick={() => setGender("FEMALE")}
            selected={gender === "FEMALE"}
          >
            여성
          </GenderButton>
        </GenderRow>

        <Label>생년</Label>
        <Select
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
        >
          <option>선택</option>
          {Array.from({ length: 50 }, (_, i) => {
            const year = 2025 - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </Select>
      </Form>

      <NextButton
        //disabled={!nickname || !gender || birthYear === "선택"}
        onClick={handleNext}
      >
        다음
      </NextButton>
    </Wrapper>
  );
};

export default SignUp3Page;

export const Wrapper = styled.div`
  max-width: 600px;
  height: 98vh;
  margin: 0 auto;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;
`;

export const StepIndicator = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  cursor: pointer;
`;

export const Step = styled.div<{ active?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  color: ${({ active }) => (active ? "white" : "#999")};
  background-color: ${({ active }) => (active ? "#1aa344" : "#ddd")};
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 8px 0 4px;
  text-align: left;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
  text-align: left;
`;

export const ProfileImageWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 24px;
`;

export const ImageCircle = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f4f4f4;
  border-radius: 50%;
  border: 2px dashed #ccc;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UploadIcon = styled.div`
  font-size: 20px;
  color: #1aa344;
`;

export const Form = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: #606076;
`;

export const NicknameRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #1aa344;
  }
`;

export const CheckButton = styled.button`
  padding: 10px 16px;
  background: #f3f3f3;
  border: none;
  border-radius: 8px;
  color: #999;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  font-size: 12px;
  color: #f04444;
  margin-top: 4px;
`;

export const GenderRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const GenderButton = styled.button<{ selected?: boolean }>`
  flex: 1;
  padding: 12px;
  border: 1px solid ${({ selected }) => (selected ? "#1aa344" : "#ddd")};
  background: ${({ selected }) => (selected ? "#e9f7ef" : "#fafafa")};
  color: ${({ selected }) => (selected ? "#1aa344" : "#555")};
  border-radius: 8px;
  cursor: pointer;
`;

export const Select = styled.select`
  width: 100%;
  margin-top: 8px;
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: white;
`;

export const NextButton = styled.button<{ disabled?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  margin-top: 40px;
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background: #1aa344;
  color: #fff;
  cursor: "pointer";
`;

/*
export const NextButton = styled.button<{ disabled?: boolean }>`
  margin-top: 40px;
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  background: ${({ disabled }) => (disabled ? "#f3f3f3" : "#1aa344")};
  color: ${({ disabled }) => (disabled ? "#999" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
*/
