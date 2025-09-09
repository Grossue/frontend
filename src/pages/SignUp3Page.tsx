import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserCheckNickname } from "../api/User";
import { getSchools } from "../api/School";

const SignUp3Page = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // 전달된 이메일 받기
  const password = location.state?.password || "";

  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(null);
  const [birthYear, setBirthYear] = useState("");

  // 닉네임 중복
  const [nicknameMessage, setNicknameMessage] = useState<string | null>(null);
  const [nicknameStatus, setNicknameStatus] = useState<
    "success" | "error" | null
  >(null);

  const handleCheckNickname = async () => {
    if (!nickname) {
      setNicknameMessage("닉네임을 입력해주세요.");
      setNicknameStatus("error");
      return;
    }

    try {
      const res = await getUserCheckNickname(nickname);
      if (res.isSuccess) {
        setNicknameMessage("사용 가능한 닉네임입니다.");
        setNicknameStatus("success");
      } else {
        setNicknameMessage("이미 사용 중인 닉네임입니다.");
        setNicknameStatus("error");
      }
    } catch (error) {
      setNicknameMessage("닉네임 확인 중 오류가 발생했습니다.");
      setNicknameStatus("error");
    }
  };

  // 학교 선택
  const [school, setSchool] = useState(""); /*
  const [schoolLevel, setSchoolLevel] = useState<
    "ElEMENTARY" | "MIDDLE" | "HIGH" | null
  >(null);
  const [schoolId, setschoolId] = useState("");
*/
  const [schoolLevel, setSchoolLevel] = useState(""); // 초등/중/고
  // 기존 상태
  const [schoolList, setSchoolList] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  // School 타입 정의
  interface School {
    id: string;
    name: string;
    schoolLevel: string;
    address: string;
  }

  // 학교 조회 함수
  const handleSearchSchools = async () => {
    if (!schoolLevel) {
      setSchoolLevelError(true); // 학교급 선택 안됨
      return;
    }
    setSchoolLevelError(false); // 학교급 선택됨

    try {
      const res = await getSchools(schoolLevel);
      const schools: School[] = res.data || [];
      setSchoolList(schools);

      if (schools.length === 0) {
        alert("해당 학교급의 학교가 없습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("학교 목록 조회 중 오류가 발생했습니다.");
    }
  };

  // 학교 검색어 상태
  const [schoolSearch, setSchoolSearch] = useState("");

  // 학교 검색 후 필터링된 학교 목록
  const filteredSchools = schoolList.filter((s) =>
    s.name.includes(schoolSearch)
  );
  // 학교급 선택 여부 체크
  const [schoolLevelError, setSchoolLevelError] = useState(false);

  // 모든 입력값 체크
  const isNextEnabled =
    nickname &&
    gender &&
    birthYear !== "선택" &&
    schoolLevel &&
    selectedSchool !== null;

  // 다음 버튼 클릭
  const handleNext = () => {
    if (!isNextEnabled) return; // 안전장치
    navigate("/signup4", {
      state: {
        email,
        password,
        nickname,
        gender,
        birthYear,
        schoolId: selectedSchool!.id,
        schoolName: selectedSchool!.name,
      },
    });
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
            onChange={(e) => {
              setNickname(e.target.value);
              setNicknameMessage(null); // 입력 바뀌면 메시지 초기화
              setNicknameStatus(null);
            }}
          />
          <CheckButton type="button" onClick={handleCheckNickname}>
            확인
          </CheckButton>
        </NicknameRow>
        {nickname && /[^a-zA-Z0-9가-힣]/.test(nickname) && (
          <ErrorText>특수문자는 포함할 수 없어요.</ErrorText>
        )}
        {nicknameMessage && (
          <NicknameMessage status={nicknameStatus}>
            {nicknameMessage}
          </NicknameMessage>
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

        <Label>학교급</Label>
        <SchoolRow>
          <Select
            value={schoolLevel}
            onChange={(e) => {
              setSchoolLevel(e.target.value);
              setSchoolList([]);
              setSelectedSchool(null);
              setSchoolLevelError(false);
            }}
          >
            <option value="">선택하세요</option>
            <option value="ELEMENTARY">초등학교</option>
            <option value="MIDDLE">중학교</option>
            <option value="HIGH">고등학교</option>
          </Select>
          <SearchButton onClick={handleSearchSchools}>조회</SearchButton>
        </SchoolRow>
        {schoolLevelError && <ErrorText>학교급을 먼저 선택해주세요.</ErrorText>}

        <Label>학교 검색</Label>
        <SchoolSearchRow>
          <Input
            placeholder="학교명을 입력하세요"
            value={schoolSearch}
            onChange={(e) => {
              if (!schoolLevel) {
                setSchoolLevelError(true); // 학교급 선택 안됨
                return;
              }
              setSchoolLevelError(false); // 선택됨
              setSchoolSearch(e.target.value);
            }}
          />
          <Select
            value={selectedSchool?.id || ""}
            onChange={(e) => {
              if (!schoolLevel) {
                setSchoolLevelError(true);
                return;
              }
              setSchoolLevelError(false);
              const school =
                schoolList.find((s) => s.id === e.target.value) || null;
              setSelectedSchool(school);
            }}
          >
            <option value="">학교 선택</option>
            {filteredSchools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </Select>
        </SchoolSearchRow>
        {schoolLevelError && <ErrorText>학교급을 먼저 선택해주세요.</ErrorText>}
      </Form>

      <NextButton disabled={!isNextEnabled} onClick={handleNext}>
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
  margin-bottom: 90px;
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;
  //overflow-y: auto;
  //box-sizing: border-box;
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
  margin-bottom: 8px;
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
  color: #555;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  font-size: 12px;
  color: #f04444;
  margin-top: 4px;
  text-align: left;
`;

export const NicknameMessage = styled.p<{ status: "success" | "error" | null }>`
  font-size: 12px;
  margin-top: 4px;
  color: ${({ status }) => (status === "success" ? "#1aa344" : "#f04444")};
  text-align: left;
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
  margin-top: 0px;
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: white;
`;

const SearchButton = styled.button`
  padding: 10px;
  background-color: #1aa344;
  border: none;
  color: white;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #168c3a;
  }
`;
const SchoolRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  align-items: center;

  & > select {
    flex: 1; // 드롭다운 넓이 늘리기
  }
`;
const SchoolSearchRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  align-items: center;

  & > input {
    flex: 1; // 검색창 넓이
  }

  & > select {
    flex: 1; // 드롭다운 넓이
  }
`;
export const NextButton = styled.button<{ disabled?: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 600px;
  padding: 14px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  background: #1aa344;
  color: #fff;
  cursor: pointer;
  z-index: 1000;
  background: ${({ disabled }) => (disabled ? "#ccc" : "#1aa344")};
  color: #fff;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
