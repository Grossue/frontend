import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as GraySearch } from "../assets/GraySearch.svg";
import { ReactComponent as GreenSearch } from "../assets/GreenSearch.svg";

const issues = [
  "네이버, 모로코에 AI 데이터센터 구축으로 중동 및 유럽 시장 진출 본격화",
  "젠지, '패패승승승' 역스윕으로 한화생명 제압 후 MSI 진출 확정",
  "한국 의학계, 신약 개발 및 치료기술 혁신 속도",
  "넷플릭스, 12년 만에 홈 화면 변화 및 한국 시장 공략 강화, 왓챠는 재정난에 직면",
  "'AI와 디자인 결합, 스스로 학습하고 예측하는 로봇 개발 연구 진행 중'",
  "텐센트, 20조원에 넥슨 인수 추진...한국 게임계에 미치는 영향은?",
  "국가 AI컴퓨팅센터 구축사업, 또다시 유찰로 사업 차질",
  "한국연구재단, 12만건 개인정보 해킹 피해…북한 김수키, 교수 대상 피싱메일 발송",
  "예스24, 구글클라우드, 오픈AI 등 주요 IT 서비스 장애 발생 후 복구 및 보상 진행 중",
  "쿠팡플레이, 부분 유료화에 나선다: 9900원 스포츠패스 론칭",
  "게임 중독 질병화 논란과 자율 심의 도입에 대한 국내외 이슈 탐색",
  "음식점과 가정에서 음식물 쓰레기 처리에 대한 이해와 해결책",
  "'SKT 해킹 사건으로 인한 가입자 55만명 KT·LGU+로 이동'",
  "AMD와 삼성, KAI 협력 강화...AI 발전 및 장기 협력 기대감 상승",
  "더본코리아의 조직 개편과 AMD의 AI 활용, 창업과 개발자 능률 향상을 위한 새로운 시도",
  "네이버와 엔비디아, AI 데이터센터를 통한 유럽 공략 및 통합 플랫폼 시대 주도 예상",
  "LG CNS, 상장 후 첫 공모가 돌파로 주가 급등",
  "AMD, 삼성 HBM3E 탑재한 차세대 AI 가속기 'MI350' 공개",
  "몽골 화석에서 티라노사우루스의 새 종 및 진화 과정 증거 발견",
  "'K-배터리, 전기차 시장에서 중저가 대세로 부상하나'",
  "삼성전자, AMD에 'HBM3E 12단' 공급 확정",
  "SK하이닉스와 마이크론, D램 및 HBM 생산에 대한 투자 확대",
  "SKT, 749만명의 유심 교체 완료... 예약 대기 225만명",
  "인플루엔자 유행주의보 해제, 코로나19에 대한 주의 강조",
  "애플과 삼성, AI 및 폴더블폰 업그레이드로 화웨이와 경쟁 본격화",
  "의학계, 폐쇄적 소통과 감정적 대응에 대한 비판과 환자 중심 정책 요구",
  "전북대·이대, 40만 학생 정보 누출로 과징금 9억 부과",
  "AMD와 네이버, AI 기술 개발 강화 및 에이전트 시대 본격화",
  "'오징어게임' 美 흥행의 비결, '진정성 있는 더빙'으로 분석",
  "이 대통령, 오광수 민정수석 사표 수리 및 3대 특검에 조은석·민중기·이명현 지명",
  "해저 케이블 보호와 중국 다롄항 수상한 구조물 탐사에 투입된 수중 로봇",
  "삼성전자의 새 슈퍼컴퓨터, 세계 18위 데뷔로 한국 종합 순위 9위 달성",
  "'리튬 부족 위기, 대안전지 개발 시급'",
  "미국, 냉장고·세탁기에 50% 철강관세 부과로 한국 가전업계 타격",
  "KT, 6월 멤버십 혜택으로 '야구 보며 치킨 먹기' 공개",
];

const HotIssuePage: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null); // 선택된 태그 상태
  const navigate = useNavigate();

  const tags = ["정치", "경제", "사회", "생활/문화", "IT/과학", "세계"];

  const handleSearch = () => {
    navigate("/loading", { state: { keyword } });
  };

  const handleIssueClick = (issue: string) => {
    navigate("/loading", { state: { keyword: issue } });
  };

  const [value, setValue] = useState<string>("");

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate("/loading", { state: { keyword } });
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(issues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = issues.slice(startIndex, startIndex + itemsPerPage);

  return (
    <PageWrapper>
      <DateText>6월 17일</DateText>
      <Title>오늘의 핫한 이슈는?</Title>
      <SearchInput
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleEnter}
        placeholder="직접 검색해 보세요"
      />
      <Button onClick={handleSearch}>검색</Button>

      <TagList>
        {tags.map((tag) => (
          <TagButton
            key={tag}
            active={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </TagButton>
        ))}
      </TagList>

      <IssueList>
        {currentItems.map((text, i) => (
          <IssueItem key={i} onClick={() => handleIssueClick(text)}>
            <GreenSearch width={18} height={18} />
            {text}
          </IssueItem>
        ))}
      </IssueList>

      <Pagination>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          이전
        </PageButton>

        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            active={currentPage === i + 1}
          >
            {i + 1}
          </PageButton>
        ))}

        <PageButton
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          다음
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
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 32px;
`;

const SearchInput = styled.input`
  width: 360px;
  padding: 14px 18px;
  margin: 0px 3px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  background-color: #f5f5f7;
  color: #666;
  outline: none;
  margin-bottom: 24px;

  &::placeholder {
    color: #aaa;
  }
`;
const Button = styled.button`
  padding: 14px 18px;
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
  gap: 12px;
  flex-wrap: wrap;
`;

const TagButton = styled.button<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? "#17b169" : "#f2f2f4")};
  color: ${({ active }) => (active ? "white" : "#4e4e57")};
  border: none;
  padding: 8px 16px;
  border-radius: 18px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? "#13995c" : "#e0e0e5")};
  }
`;
const IssueList = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
`;

const IssueItem = styled.div`
  background-color: #f5f5f7;
  padding: 12px 16px;
  border-radius: 12px;
  text-align: left;
  color: #333;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background-color: #eaeaec;
  }
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  gap: 8px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? "#17b169" : "#f0f0f0")};
  color: ${({ active }) => (active ? "white" : "#333")};
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:hover:not(:disabled) {
    background-color: ${({ active }) => (active ? "#13995c" : "#ddd")};
  }
`;
