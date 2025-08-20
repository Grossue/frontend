import React, { useState } from "react";
import styled from "styled-components";
import FONT from "../styles/font";
import { useNavigate } from "react-router-dom";

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

const VocabularyPage: React.FC = () => {
  const [words, setWords] = useState<WordItem[]>(mockWords);

  const handleDelete = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };
  return (
    <PageWrapper>
      <Title style={FONT.xxxl.bold}>내 단어장</Title>
      <WordSection>
        <WordList>
          {words.map((word, i) => (
            <WordCard key={i}>
              <WordMain>
                <WordTerm style={FONT.xl.bold}>{word.term}</WordTerm>
                <WordHanja style={FONT.lg.medium}> 增加하다</WordHanja>
                <br />
                <WordType style={FONT.md.semibold}>{word.type}</WordType>
                <WordMeaning style={FONT.lg.medium}>
                  {" "}
                  {word.meaning}
                </WordMeaning>
              </WordMain>
              <DeleteButton onClick={() => handleDelete(i)}>삭제</DeleteButton>
            </WordCard>
          ))}
        </WordList>
      </WordSection>
    </PageWrapper>
  );
};

export default VocabularyPage;

const PageWrapper = styled.div`
  padding: 60px 0;
  text-align: center;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 32px;
  margin-top: 20px;
  color: ${({ theme }) => theme.color.gray80};
`;
const WordSection = styled.div`
  width: 900px;
  border-radius: 24px;
  margin: 0 auto;
  padding: 40px 32px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.color.gray05};
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
  color: ${({ theme }) => theme.color.primary70};
`;
const WordHanja = styled.span`
  color: ${({ theme }) => theme.color.gray30};
`;
const WordMeaning = styled.span`
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
