import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { postRegister } from "../api/User";

const SignUp4Page = () => {
  const [selected, setSelected] = useState<"LEVEL1" | "LEVEL2" | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 전달된 변수들 받기
  const email = location.state?.email || "";
  const password = location.state?.password || "";
  const nickname = location.state?.nickname || "";
  const gender = location.state?.gender || "";
  const birthYear = location.state?.birthYear || "";
  const schoolName = location.state?.schoolName || "";

  useEffect(() => {
    console.log("회원가입 정보 :", location.state);
  }, []);

  const handleSubmit = async () => {
    if (!selected) return;
    try {
      setLoading(true);
      const response = await postRegister({
        email,
        password,
        nickname,
        gender,
        birthYear,
        level: selected,
        schoolName,
      }); // 회원가입
      console.log("회원가입 완료 :", response.data);
      navigate("/login");
    } catch (error) {
      alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <StepIndicator>
        <Step onClick={() => navigate("/signup1")}>1</Step>
        <Step onClick={() => navigate("/signup2")}>2</Step>
        <Step onClick={() => navigate("/signup3")}>3</Step>
        <Step active>4</Step>
      </StepIndicator>

      <Title>마지막이에요!</Title>
      <Subtitle>아래 예문을 보고, 레벨을 선택해 주세요</Subtitle>

      <CardContainer>
        <Card
          selected={selected === "LEVEL1"}
          onClick={() => setSelected("LEVEL1")}
        >
          <Icon>🌱</Icon>
          <CardText>
            <CardTitle>
              새싹 <span>10세~16세</span>
            </CardTitle>
            <CardDesc>나라에서 돈 빌리는 걸 더 어렵게 했어요</CardDesc>
          </CardText>
        </Card>

        <Card
          selected={selected === "LEVEL2"}
          onClick={() => setSelected("LEVEL2")}
        >
          <Icon>🌷</Icon>
          <CardText>
            <CardTitle>
              꽃 <span>16세 이상</span>
            </CardTitle>
            <CardDesc>정부가 돈을 빌릴 때 내야 하는 이자를 높였어요</CardDesc>
          </CardText>
        </Card>
      </CardContainer>

      <NextButton disabled={!selected || loading} onClick={handleSubmit}>
        {loading ? "가입 중..." : "시작"}
      </NextButton>
    </Wrapper>
  );
};

export default SignUp4Page;

export const Wrapper = styled.div`
  max-width: 600px;
  height: 98vh;
  margin: 0 auto;
  padding: 32px 20px;
  position: relative;
`;

export const StepIndicator = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const Step = styled.div<{ active?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  color: ${({ active }) => (active ? "white" : "#aaa")};
  background-color: ${({ active }) => (active ? "#1aa344" : "#ddd")};
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
  text-align: left;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 28px;
  text-align: left;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Card = styled.button<{ selected: boolean }>`
  display: flex;
  align-items: center;
  border: 1.5px solid ${({ selected }) => (selected ? "#1aa344" : "#e0e0e0")};
  border-radius: 16px;
  background: ${({ selected }) => (selected ? "#f2fff7" : "white")};
  padding: 16px;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    border-color: #1aa344;
  }
`;

export const Icon = styled.div`
  font-size: 36px;
  margin-right: 16px;
`;

export const CardText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;

  span {
    margin-left: 4px;
    font-size: 13px;
    color: #666;
  }
`;

export const CardDesc = styled.div`
  margin-top: 4px;
  font-size: 13px;
  color: #888;
`;

export const NextButton = styled.button<{ disabled: boolean }>`
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
  background: ${({ disabled }) => (disabled ? "#f3f3f3" : "#1aa344")};
  color: ${({ disabled }) => (disabled ? "#999" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
