import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import FONT from "../styles/font";
import { useNavigate } from "react-router-dom";
import { getSchoolsRank } from "../api/School"; // API import

interface SchoolRank {
  id: string;
  name: string;
  addr: string;
  reward_sum: number;
  isMySchool: boolean;
}

const RankingPage: React.FC = () => {
  const [schools, setSchools] = useState<SchoolRank[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const res = await getSchoolsRank();
        if (res.isSuccess) {
          setSchools(res.data);
        }
      } catch (err) {
        console.error("학교 랭킹 불러오기 실패", err);
      }
    };
    fetchRank();
  }, []);

  return (
    <PageWrapper>
      <Title style={FONT.xxxl.bold}>우리 학교의 랭킹은?</Title>
      <DateText>같은 나이 학생들끼리의 랭킹이에요! </DateText>

      <IssueList>
        {schools.map((school, index) => {
          const rankNum = index + 1;
          const isMySchool = school.isMySchool;
          const RankStyle =
            rankNum === 1
              ? Rank1
              : rankNum === 2
              ? Rank2
              : rankNum === 3
              ? Rank3
              : Rank4;

          const IssueItemStyle = isMySchool ? IssueItem2 : IssueItem;

          return (
            <IssueItemStyle
              key={school.id}
              onClick={() => navigate(`/school/${school.id}`)}
              $delay={index * 0.1}
            >
              <RankStyle>{rankNum}</RankStyle>
              {school.name}
              <p style={FONT.md.medium}>{school.reward_sum} R</p>
            </IssueItemStyle>
          );
        })}
      </IssueList>
    </PageWrapper>
  );
};

export default RankingPage;

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const PageWrapper = styled.div`
  padding: 60px 0;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 8px;

  color: ${({ theme }) => theme.color.gray80};
`;
const DateText = styled.p`
  font-size: 18px;
  color: #7e7e8a;
  margin-bottom: 32px;
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
const IssueItem = styled.div<{ $delay?: number }>`
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
  margin: 2px 0;
  position: relative;
  opacity: 0;
  animation: ${fadeUp} 0.4s ease forwards;
  animation-delay: ${({ $delay }) => $delay || 0}s;

  &:hover {
    background-color: #eaeaec;
  }

  p {
    position: absolute;
    right: 15px;
    color: ${({ theme }) => theme.color.gray40};
  }
`;

const Rank1 = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${({ theme }) => theme.color.primary70};
  border-radius: 50%;
  text-align: center;
  color: #fff;
  font-size: 17px;
  align-items: center;
  line-height: 25px;
`;
const Rank2 = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${({ theme }) => theme.color.primary60};
  border-radius: 50%;
  text-align: center;
  color: #fff;
  font-size: 17px;
  align-items: center;
  line-height: 25px;
`;

const IssueItem2 = styled.div`
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
  position: relative;
  border: solid 3px ${({ theme }) => theme.color.primary70};

  &:hover {
    background-color: #eaeaec;
  }
  p {
    position: absolute;

    right: 15px;
    color: ${({ theme }) => theme.color.gray40};
  }
`;
const Rank3 = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${({ theme }) => theme.color.primary50};
  border-radius: 50%;
  text-align: center;
  color: #fff;
  font-size: 17px;
  align-items: center;
  line-height: 25px;
`;
const Rank4 = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  color: ${({ theme }) => theme.color.gray20};
  font-size: 17px;
  align-items: center;
  line-height: 25px;
`;
