import React, { useState } from "react";
import styled from "styled-components";
import FONT from "../styles/font";
import { useNavigate } from "react-router-dom";

const RankingPage: React.FC = () => {
  return (
    <PageWrapper>
      <Title style={FONT.xxxl.bold}>우리 학교의 랭킹은?</Title>
      <DateText>같은 나이 학생들끼리의 랭킹이에요! </DateText>

      <IssueList>
        <IssueItem>
          <Rank1>1</Rank1>서울초등학교<p style={FONT.md.medium}>889 R</p>
        </IssueItem>
        <IssueItem2>
          <Rank2>2</Rank2>덕성초등학교<p style={FONT.md.medium}>856 R</p>
        </IssueItem2>
        <IssueItem>
          <Rank3>3</Rank3>경기초등학교<p style={FONT.md.medium}>823 R</p>
        </IssueItem>
        <IssueItem>
          <Rank4>4</Rank4>광주초등학교<p style={FONT.md.medium}>822 R</p>
        </IssueItem>
        <IssueItem>
          <Rank4>5</Rank4>제주초등학교<p style={FONT.md.medium}>810 R</p>
        </IssueItem>
        <IssueItem>
          <Rank4>6</Rank4>강원초등학교<p style={FONT.md.medium}>750 R</p>
        </IssueItem>
        <IssueItem>
          <Rank4>7</Rank4>인천초등학교<p style={FONT.md.medium}>723 R</p>
        </IssueItem>
        <IssueItem>
          <Rank4>8</Rank4>부산초등학교<p style={FONT.md.medium}>711 R</p>
        </IssueItem>
        <IssueItem>
          <Rank4>9</Rank4>대전초등학교<p style={FONT.md.medium}>695 R</p>
        </IssueItem>
        <IssueItem>
          <Rank4>10</Rank4>세종초등학교<p style={FONT.md.medium}>662 R</p>
        </IssueItem>
      </IssueList>
    </PageWrapper>
  );
};

export default RankingPage;

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
  position: relative;

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
