import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as GraySearch } from "../assets/GraySearch.svg";
import { ReactComponent as GreenSearch } from "../assets/GreenSearch.svg";
import { ReactComponent as Previous } from "../assets/Previous.svg";
import { ReactComponent as Next } from "../assets/Next.svg";

const issues = [
  // --- 정치 ---
  {
    text: "한국연구재단, 12만건 개인정보 해킹 피해…북한 김수키, 교수 대상 피싱메일 발송",
    category: "정치",
  },
  { text: "정부, 차세대 반도체 인재 양성 정책 발표", category: "정치" },
  { text: "국회, 데이터센터 안전 관리 법안 통과", category: "정치" },
  { text: "외교부, AI 윤리 국제 협약 주도 추진", category: "정치" },
  { text: "행안부, 디지털 헬스케어 규제 완화 계획 발표", category: "정치" },
  { text: "과기부, 국가 AI 전략 2030 발표", category: "정치" },

  // --- 경제 ---
  {
    text: "텐센트, 20조원에 넥슨 인수 추진...한국 게임계에 미치는 영향은?",
    category: "경제",
  },
  {
    text: "AMD와 삼성, KAI 협력 강화...AI 발전 및 장기 협력 기대감 상승",
    category: "경제",
  },
  { text: "LG CNS, 상장 후 첫 공모가 돌파로 주가 급등", category: "경제" },
  {
    text: "'K-배터리, 전기차 시장에서 중저가 대세로 부상하나'",
    category: "경제",
  },
  { text: "삼성전자, AMD에 'HBM3E 12단' 공급 확정", category: "경제" },
  {
    text: "SK하이닉스와 마이크론, D램 및 HBM 생산에 대한 투자 확대",
    category: "경제",
  },
  { text: "'리튬 부족 위기, 대안전지 개발 시급'", category: "경제" },

  // --- 사회 ---
  { text: "한국 의학계, 신약 개발 및 치료기술 혁신 속도", category: "사회" },
  {
    text: "게임 중독 질병화 논란과 자율 심의 도입에 대한 국내외 이슈 탐색",
    category: "사회",
  },
  {
    text: "인플루엔자 유행주의보 해제, 코로나19에 대한 주의 강조",
    category: "사회",
  },
  {
    text: "의학계, 폐쇄적 소통과 감정적 대응에 대한 비판과 환자 중심 정책 요구",
    category: "사회",
  },
  {
    text: "고령화 사회 진입, 의료 서비스 디지털 전환 요구 증가",
    category: "사회",
  },
  { text: "청년 실업률 상승, 정부 취업 지원 정책 논란", category: "사회" },

  // --- 생활/문화 ---
  {
    text: "젠지, '패패승승승' 역스윕으로 한화생명 제압 후 MSI 진출 확정",
    category: "생활/문화",
  },
  {
    text: "쿠팡플레이, 부분 유료화에 나선다: 9900원 스포츠패스 론칭",
    category: "생활/문화",
  },
  {
    text: "음식점과 가정에서 음식물 쓰레기 처리에 대한 이해와 해결책",
    category: "생활/문화",
  },
  {
    text: "K-팝, 빌보드 차트 1위 기록... 세계 시장 확대",
    category: "생활/문화",
  },
  { text: "한국 영화, 칸 국제영화제 수상 쾌거", category: "생활/문화" },
  { text: "도쿄 패션위크에서 한국 디자이너 작품 주목", category: "생활/문화" },

  // --- IT/과학 ---
  {
    text: "네이버, 모로코에 AI 데이터센터 구축으로 중동 및 유럽 시장 진출 본격화",
    category: "IT/과학",
  },
  {
    text: "'AI와 디자인 결합, 스스로 학습하고 예측하는 로봇 개발 연구 진행 중'",
    category: "IT/과학",
  },
  {
    text: "국가 AI컴퓨팅센터 구축사업, 또다시 유찰로 사업 차질",
    category: "IT/과학",
  },
  {
    text: "예스24, 구글클라우드, 오픈AI 등 IT 서비스 장애 발생 후 복구 및 보상 진행 중",
    category: "IT/과학",
  },
  {
    text: "'SKT 해킹 사건으로 인한 가입자 55만명 KT·LGU+로 이동'",
    category: "IT/과학",
  },
  {
    text: "네이버와 엔비디아, AI 데이터센터를 통한 유럽 공략 및 통합 플랫폼 시대 주도 예상",
    category: "IT/과학",
  },
  {
    text: "AMD, 삼성 HBM3E 탑재한 차세대 AI 가속기 'MI350' 공개",
    category: "IT/과학",
  },
  {
    text: "SKT, 749만명의 유심 교체 완료... 예약 대기 225만명",
    category: "IT/과학",
  },
  {
    text: "애플과 삼성, AI 및 폴더블폰 업그레이드로 화웨이와 경쟁 본격화",
    category: "IT/과학",
  },
  {
    text: "AMD와 네이버, AI 기술 개발 강화 및 에이전트 시대 본격화",
    category: "IT/과학",
  },
  {
    text: "삼성전자의 새 슈퍼컴퓨터, 세계 18위 데뷔로 한국 종합 순위 9위 달성",
    category: "IT/과학",
  },

  // --- 세계 ---
  {
    text: "넷플릭스, 12년 만에 홈 화면 변화 및 한국 시장 공략 강화, 왓챠는 재정난에 직면",
    category: "세계",
  },
  {
    text: "몽골 화석에서 티라노사우루스의 새 종 및 진화 과정 증거 발견",
    category: "세계",
  },
  {
    text: "해저 케이블 보호와 중국 다롄항 수상한 구조물 탐사에 투입된 수중 로봇",
    category: "세계",
  },
  {
    text: "미국, 냉장고·세탁기에 50% 철강관세 부과로 한국 가전업계 타격",
    category: "세계",
  },
  { text: "EU, AI 규제법 최종 통과로 글로벌 IT 기업에 영향", category: "세계" },
  { text: "일본, 반도체 제조 장비 수출 규제 강화", category: "세계" },

  // --- AI 추천 ---
  {
    text: "생성형 AI 기술이 대학 교육 전반에 미치는 영향과 학습 방식 혁신 사례 분석",
    category: "💡AI 추천",
  },
  {
    text: "기후 변화 대응을 위한 AI 활용 사례와 지속 가능한 환경 정책 연계 전략",
    category: "💡AI 추천",
  },
  {
    text: "스마트시티 개발에서 AI 기술이 도시 인프라와 교통 시스템 개선에 기여하는 방식",
    category: "💡AI 추천",
  },
  {
    text: "AI 기반 헬스케어 서비스가 개인 맞춤형 치료와 의료 효율성 향상에 미치는 영향",
    category: "💡AI 추천",
  },
  {
    text: "로봇과 인공지능이 함께 만들어가는 미래 일자리 변화와 산업 구조 혁신 분석",
    category: "💡AI 추천",
  },
  {
    text: "AI 아트를 통한 창작 영역 확장과 인간과 기계의 협업적 예술 가능성 탐구",
    category: "💡AI 추천",
  },
];

interface TagButtonProps {
  active: boolean;
  isAi?: boolean;
}

const HotIssuePage: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("IT/과학");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const tags = [
    "IT/과학",
    "정치",
    "경제",
    "사회",
    "생활/문화",
    "세계",
    "💡AI 추천",
  ];

  // 오늘 날짜
  const today = new Date();

  const year = today.getFullYear(); // 연도, 예: 2025
  const month = today.getMonth() + 1; // 월 (0~11 이므로 +1), 예: 8
  const date = today.getDate(); // 일, 예: 19
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const day = days[today.getDay()]; // 요일, 예: "월"

  const handleSearch = () => {
    navigate("/loading", { state: { keyword } });
  };

  const handleIssueClick = (issue: string) => {
    navigate("/loading", { state: { keyword: issue } });
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  // 태그 선택 시 해당 이슈만 필터링
  const filteredIssues = issues.filter((i) => i.category === selectedTag);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredIssues.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <PageWrapper>
      <DateText>
        {month}월 {date}일
      </DateText>
      <Title>오늘의 핫한 이슈는?</Title>
      <SearchWrapper>
        <SearchIcon />
        <SearchInput
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleEnter}
          placeholder="직접 검색해 보세요"
        />
      </SearchWrapper>
      {/*<Button onClick={handleSearch}>검색</Button>*/}

      <TagList>
        {tags.map((tag) => (
          <TagButton
            key={tag}
            active={selectedTag === tag}
            isAi={tag === "💡AI 추천"} // 💡 AI 추천이면 true 전달
            onClick={() => {
              setSelectedTag(tag);
              setCurrentPage(1); // 태그 바뀔 때 페이지도 초기화
            }}
          >
            {tag}
          </TagButton>
        ))}
      </TagList>

      <IssueList>
        {currentItems.map((issue, i) => (
          <IssueItem key={i} onClick={() => handleIssueClick(issue.text)}>
            <GreenSearch width={18} height={18} />
            {issue.text}
          </IssueItem>
        ))}
      </IssueList>

      <Pagination>
        <PageButton disabled={currentPage === 1} onClick={handlePrev}>
          <Previous />
        </PageButton>
        <span>
          {currentPage} / {totalPages}
        </span>
        <PageButton disabled={currentPage === totalPages} onClick={handleNext}>
          <Next />
        </PageButton>
      </Pagination>
    </PageWrapper>
  );
};

export default HotIssuePage;

const PageWrapper = styled.div`
  padding: 60px 0;
  text-align: center;
`;

const DateText = styled.p`
  font-size: 18px;
  color: #7e7e8a;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 32px;
  margin-top: 20px;
`;
const SearchWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const SearchInput = styled.input`
  width: 530px;
  height: 48px;
  padding: 0 18px 0 44px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  background-color: #f5f5f7;
  color: #666;
  outline: none;
  margin-bottom: 24px;

  &::placeholder {
    color: ${({ theme }) => theme.color.gray40};
  }
  &:hover {
    background-color: #eee;
    transition: all 0.25s; /* 아이콘 색상 트랜지션 */
  }
  &:focus {
    background-color: #eee;
    transition: fill 0.25s ease; /* 아이콘 색상 트랜지션 */
  }

  /* input이 focus되면 아이콘 스타일 변경 */
  &:focus + svg {
    fill: #333; /* 아이콘 색상 진하게 */
  }
`;

const SearchIcon = styled(GraySearch)`
  position: absolute;
  top: 33%;
  left: 16px;
  transform: translateY(-50%); /* 세로 중앙 정렬 */
  width: 20px;
  height: 20px;
  pointer-events: none;
`;
const Button = styled.button`
  padding: 14px 20px;
  background-color: #17b169;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: #13995c;
  }
`;
const TagList = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
`;
const TagButton = styled.button<TagButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 2px solid
    ${({ isAi, theme }) => (isAi ? "#a855f7" : theme.color.gray20)}; // AI 추천이면 보라색, 아니면 회색
  background-color: ${({ active }) => (active ? "#22c55e" : "#fff")};
  color: ${({ active, isAi, theme }) =>
    active
      ? "#fff"
      : isAi
      ? "#9333ea"
      : theme.color.gray60}; // AI 추천이면 보라 글씨
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? "#16a34a" : "#f9fafb")};
  }
`;
const IssueList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const IssueItem = styled.div`
  background-color: #f5f5f7;
  padding: 12px 16px;
  border-radius: 12px;
  text-align: left;
  color: #333;
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin: 2px 0px;

  &:hover {
    background-color: #eaeaec;
  }
`;
const Pagination = styled.div`
  display: flex;
  align-items: center; // 세로 중앙 정렬
  justify-content: center; // 가로 중앙 정렬
  gap: 12px; // 요소 사이 간격
  margin-top: 20px;
  color: ${({ theme }) => theme.color.gray40};
  font-size: 14px;

  span {
    display: inline-block; // inline-block으로 span 크기 맞춤
    min-width: 40px; // 숫자 길이에 따라 간격 일정하게
    text-align: center; // 가운데 정렬
  }
`;
const PageButton = styled.button<{ disabled?: boolean }>`
  border: none;
  background: none;
  font-size: 18px;
  margin: 0 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.gray50};

  &:disabled {
    color: ${({ theme }) => theme.color.gray20};
    cursor: not-allowed;
  }
`;
