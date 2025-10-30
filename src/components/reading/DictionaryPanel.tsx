import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as StarFill } from "../../assets/StarFill.svg";
import { ReactComponent as StarEmpty } from "../../assets/StarEmpty.svg";
import FONT from "../../styles/font";
import {
  deleteDictionary,
  getDictionary,
  postDictionary,
} from "../../api/Dictionary";
import { ReactComponent as Close } from "../../assets/Close.svg";

interface Word {
  word: string;
  definition: string;
  pos: string;
  link: string;
  targetCode: string;
  isBookmarked?: boolean;
}

interface DictionaryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const DictionaryPanel: React.FC<DictionaryPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  //
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 100);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  //
  useEffect(() => {
    if (!debouncedTerm.trim()) {
      setWords([]);
      return;
    }

    const fetchWords = async () => {
      setLoading(true);
      try {
        const response = await getDictionary(debouncedTerm);
        const results = (response.data.results || []).map((word: Word) => ({
          ...word,
          isBookmarked: false,
        }));
        setWords(results);
      } catch (error) {
        console.error("검색 오류", error);
        setWords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [debouncedTerm]);

  const toggleBookmark = async (index: number, word: Word) => {
    const updated = [...words];
    const isCurrentlyBookmarked = word.isBookmarked;

    try {
      if (isCurrentlyBookmarked) {
        await deleteDictionary(word.targetCode);
      } else {
        await postDictionary({
          word: word.word,
          definition: word.definition,
          type: "word",
          link: word.link,
          targetCode: word.targetCode,
          supNo: "1",
          pos: word.pos,
        });
      }

      updated[index] = {
        ...word,
        isBookmarked: !isCurrentlyBookmarked,
      };
      setWords(updated);
    } catch (error) {
      console.error("즐겨찾기 토글 실패", error);
    }
  };

  return (
    <PanelWrapper isOpen={isOpen}>
      <PanelHeader>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
      </PanelHeader>
      <Header>
        <Title style={FONT.lg.bold}>사전</Title>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Header>

      <WordList>
        {loading && <LoadingText>검색 중...</LoadingText>}
        {!loading && words.length === 0 && debouncedTerm.trim() !== "" && (
          <NoResultText>검색 결과가 없습니다.</NoResultText>
        )}
        {words.map((word, i) => (
          <WordCard key={word.targetCode}>
            <WordHeader>
              <WordTitle>
                <a href={word.link} target="_blank" rel="noopener noreferrer">
                  <span className="korean">{word.word}</span>{" "}
                  <span className="pos">{word.pos}</span>
                </a>
              </WordTitle>
              <BookmarkBtn onClick={() => toggleBookmark(i, word)}>
                {word.isBookmarked ? <StarFill /> : <StarEmpty />}
              </BookmarkBtn>
            </WordHeader>
            <WordMeta>
              <Meaning>{word.definition}</Meaning>
            </WordMeta>
          </WordCard>
        ))}
      </WordList>
    </PanelWrapper>
  );
};

export default DictionaryPanel;

const PanelWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.gray05};
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.08);
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled.div`
  padding: 16px;
  padding-bottom: 30px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  left: 20px;
  background: transparent;
  border: none;
  font-size: 18px;
  color: #888;
  cursor: pointer;
`;

const Header = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.color.gray80};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray30};
  font-size: 14px;
`;

const WordList = styled.div`
  padding: 16px;
  overflow-y: auto;
  flex: 1;
`;

const WordCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const WordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WordTitle = styled.div`
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.color.primary70};
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }

  .korean {
    margin-right: 8px;
  }

  .pos {
    font-size: 13px;
    color: ${({ theme }) => theme.color.gray50};
  }
`;

const BookmarkBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
`;

const WordMeta = styled.div`
  margin-top: 8px;
`;

const Meaning = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray70};
  text-align: left;
`;

const LoadingText = styled.div`
  color: ${({ theme }) => theme.color.gray50};
  padding: 20px;
`;

const NoResultText = styled.div`
  color: ${({ theme }) => theme.color.gray50};
  padding: 20px;
`;
