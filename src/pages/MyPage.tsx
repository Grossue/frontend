import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";
import FONT from "../styles/font";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Settings } from "../assets/Settings.svg";
import { ReactComponent as Divider } from "../assets/Divider.svg";
import { ReactComponent as MoveMemory } from "../assets/MoveMemory.svg";

interface WordItem {
  term: string;
  meaning: string;
  type: string;
}

const mockWords: WordItem[] = [
  { term: "증가하다", meaning: "양이나 수치가 늘다.", type: "동사" },
  { term: "증가하다", meaning: "양이나 수치가 늘다.", type: "동사" },
  { term: "증가하다", meaning: "양이나 수치가 늘다.", type: "동사" },
];
const MyPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [words, setWords] = useState<WordItem[]>(mockWords);
  const [level, setLevel] = useState<number>(() => {
    // localStorage에서 가져오기, 없으면 기본 1
    const storedLevel = localStorage.getItem("user_level");
    return storedLevel ? parseInt(storedLevel, 10) : 1;
  });
  const handleDelete = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  // 레벨 설정
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLevel = Number(e.target.value);
    setLevel(selectedLevel);
    localStorage.setItem("user_level", selectedLevel.toString());
  };

  // 오늘 날짜
  const today = new Date();

  const year = today.getFullYear(); // 연도, 예: 2025
  const month = today.getMonth() + 1; // 월 (0~11 이므로 +1), 예: 8
  const date = today.getDate(); // 일, 예: 19
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const day = days[today.getDay()]; // 요일, 예: "월"

  // 1일 기준요일 (0 = 일요일, 1 = 월요일, ..., 5 = 금요일, 6 = 토요일)
  const firstDayOfMonth = 5; // 1일이 금요일

  // 뉴스 메모리 임시 날짜
  const memoryDates = [3, 5, 12, 16, 17, 18]; // 동그라미 표시할 날짜
  return (
    <Container>
      <Title style={FONT.xxxl.bold}>마이페이지</Title>
      <Main>
        <ProfileCard>
          <Avatar src="/grossueLogo.png" alt="avatar" />
          <ProfileInfo>
            <Name>
              김구름 <Status>새싹</Status>
            </Name>
            <Email>example@email.com</Email>
          </ProfileInfo>

          {/* 레벨 설정 부분 */}
          <LevelSelectWrapper>
            <label style={FONT.md.regular}>
              <Settings id="settings" />
              레벨 설정:
              <LevelSelect
                value={level}
                onChange={handleLevelChange}
                level={level}
              >
                <option value={1}>🌱 새싹 - 대화형</option>
                <option value={2}>🌱 새싹 - 일반형</option>
                <option value={3}>🌸 꽃</option>
              </LevelSelect>
            </label>
          </LevelSelectWrapper>
        </ProfileCard>

        <Stats>
          <StatBox>
            <StatTitle>연속 출석일</StatTitle>
            <StatValue style={FONT.xl.semibold}>3일</StatValue>
          </StatBox>
          <StatBox>
            <StatTitle>리워드</StatTitle>
            <StatValue style={FONT.xl.semibold}>23점</StatValue>
          </StatBox>
          <StatBox>
            <StatTitle>읽은 뉴스</StatTitle>
            <StatValue style={FONT.xl.semibold}>15개</StatValue>
          </StatBox>
        </Stats>
      </Main>
      <Main>
        <MemoryHeader>
          <MemoryTitle style={FONT.xxl.bold}>나의 뉴스 메모리</MemoryTitle>
        </MemoryHeader>
        <CalendarWrapper>
          <CalendarContainer>
            <CalendarHeader>
              {["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
                <CalendarDay key={i} isHeader>
                  {day}
                </CalendarDay>
              ))}
            </CalendarHeader>

            <Calendar>
              {/* 1일 전 빈칸 채우기 */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <CalendarDay key={`empty-${i}`} />
              ))}

              {/* 실제 날짜 채우기 */}
              {Array.from({ length: 31 }, (_, i) => (
                <CalendarDay key={i + 1} isToday={i + 1 === date}>
                  {i + 1}
                  {memoryDates.includes(i + 1) && <Dot />}
                </CalendarDay>
              ))}
            </Calendar>
          </CalendarContainer>
          <Divider />

          <TodayNews>
            <NewsTitle style={FONT.md.regular}>
              {month}월 {date}일 {day}요일{" "}
              <span id="date">{memoryDates.length}개</span>
            </NewsTitle>

            <NewsList>
              <NewsItem
                style={FONT.md.semibold}
                onClick={() => navigate("/newsmemory1/general")}
              >
                조경태, 특검 출석하며 '당내 내란 동조세력' 존재 강조
                <MoveMemory id="move" />
              </NewsItem>
              <NewsItem
                style={FONT.md.semibold}
                onClick={() => navigate("/newsmemory1/script")}
              >
                조경태, 특검 출석하며 '당내 내란 동조세력' 존재 강조
                <MoveMemory id="move" />
              </NewsItem>
              <NewsItem
                style={FONT.md.semibold}
                onClick={() => navigate("/newsmemory2")}
              >
                조경태, 특검 출석하며 '당내 내란 동조세력' 존재 강조
                <MoveMemory id="move" />
              </NewsItem>
            </NewsList>
          </TodayNews>
        </CalendarWrapper>
      </Main>
      <Main>
        <WordSection>
          <WordHeader>
            <WordTitle style={FONT.xxl.bold}>단어장</WordTitle>
            <MoreButton onClick={() => navigate("/vocabulary")}>
              더보기 &gt;
            </MoreButton>
          </WordHeader>
          <WordList>
            {words.map((word, i) => (
              <WordCard key={i}>
                <WordMain>
                  <WordTerm>{word.term}</WordTerm>
                  <WordHanja> 增加하다</WordHanja>
                  <br />
                  <WordType>{word.type}</WordType>
                  <WordMeaning> {word.meaning}</WordMeaning>
                </WordMain>
                <DeleteButton onClick={() => handleDelete(i)}>
                  삭제
                </DeleteButton>
              </WordCard>
            ))}
          </WordList>
        </WordSection>
      </Main>
    </Container>
  );
};
export default MyPage;
/* Styled Components */
const Container = styled.div`
  padding: 60px 0;
  text-align: center;
`;
const Title = styled.div`
  text-align: center;
  margin-bottom: 32px;
  margin-top: 20px;
  color: ${({ theme }) => theme.color.gray80};
`;
const Main = styled.div`
  width: 900px;
  border-radius: 24px;
  margin: 0 auto;
  padding: 40px 32px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.color.gray05};
  margin-bottom: 32px;
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  position: relative;
  margin-bottom: 32px;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  text-align: left;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 18px;
`;

const Status = styled.span`
  color: #4caf50;
  font-size: 14px;
  margin-left: 6px;
`;

const Email = styled.div`
  font-size: 14px;
  color: #999;
`;

const SettingsButton = styled.button`
  position: absolute;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const Stats = styled.div`
  display: flex;
  gap: 20px;
`;

const StatBox = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  flex: 1;
  text-align: left;
`;

const StatTitle = styled.div`
  font-size: 14px;
  color: #999;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const MemoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;
const MemoryTitle = styled.div`
  font-weight: 600;
  text-align: left;
  //padding: 20px;
`;
const CalendarWrapper = styled.div`
  display: flex;
  gap: 25px;
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 40px);
  gap: 2px;
  margin-bottom: 4px;
`;

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 40px);
  gap: 2px;
`;

const CalendarDay = styled.div<{ isHeader?: boolean; isToday?: boolean }>`
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  background: ${({ isHeader, isToday, theme }) =>
    isToday ? theme.color.primary70 : "#fff"};
  color: ${({ isToday, isHeader, theme }) =>
    isToday ? "#fff" : isHeader ? theme.color.gray30 : "#000"};
  font-weight: ${({ isHeader }) => (isHeader ? 600 : 400)};
  border-radius: 50%;
  border: none;
  position: relative;
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${({ theme }) => theme.color.primary70};
  border-radius: 50%;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
`;
const TodayNews = styled.div`
  text-align: left;
  flex: 1;
`;
const NewsTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;

  #date {
    color: ${({ theme }) => theme.color.primary70};
  }
`;

const NewsList = styled.ul`
  height: 222px;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;          /* 세로 스크롤 가능 */
  scrollbar-width: thin;     /* Firefox용 얇은 스크롤바 */
  scrollbar-color: #ccc #f5f5f5; /* Firefox용 스크롤 색 */

  /* Chrome, Edge, Safari용 커스텀 스크롤바 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #999;  /* hover 시 조금 더 어둡게 */
`;
const NewsItem = styled.li`
  margin: 2px 0;
  padding-right: 24px; // 아이콘 공간 확보
  padding-left: 10px;
  padding: 5px 24px 5px 10px; //상 우 하 좌(시계방향)
  cursor: pointer;
  position: relative; // 아이콘 위치 기준
  border-radius: 6px;

  &:hover {
    background-color: #eaeaec;
    transition: background-color 0.2s ease-in-out;
  }

  svg {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const WordSection = styled.div``;

const WordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const WordTitle = styled.div`
  font-weight: 600;
`;

const MoreButton = styled.div`
  font-size: 14px;
  color: #999;
  cursor: pointer;
`;

const WordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const WordCard = styled.div`
  text-align: left;
  background: #fff;
  padding: 12px 16px;
  border-radius: 12px;
  position: relative;
`;

const WordMain = styled.div``;

const WordTerm = styled.span`
  line-height: 30px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.primary70};
`;
const WordHanja = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray30};
`;
const WordMeaning = styled.span`
  font-size: 14px;
  color: #666;
`;

const WordType = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.color.primary70};
  background-color: ${({ theme }) => theme.color.primary10};
  border-radius: 6px;
  padding: 3px 7px;

  margin-top: 4px;
`;

const DeleteButton = styled.button`
  padding: 3px 7px;
  border-radius: 6px;
  line-height: 15px;
  background-color: ${({ theme }) => theme.color.gray05};
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray40};
  border: none;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 20px;
`;
const LevelSelectWrapper = styled.div`
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center; // 수직 가운데 정렬
  gap: 6px; // 요소 사이 간격
  font-size: 14px;
  padding: 5px 7px;
  border-radius: 10px;
  color: ${({ theme }) => theme.color.gray40};

  label {
    display: flex;
    align-items: center; // label 내부 요소도 수직 가운데 정렬
    gap: 6px;
    cursor: pointer;
  }

  #settings {
    vertical-align: middle;
  }
  &:hover {
    background-color: #eaeaec;
    transition: background-color 0.2s ease-in-out;
  }
`;

const LevelSelect = styled.select<{ level: number }>`
  margin-left: 8px;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: ${({ theme, level }) =>
    level === 1
      ? theme.color.primary10
      : level === 2
      ? theme.color.primary20
      : "#FFF3F6"};
  color: ${({ theme, level }) =>
    level === 1
      ? theme.color.primary80
      : level === 2
      ? theme.color.primary80
      : "#F92C5C"};
`;
