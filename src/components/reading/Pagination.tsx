import React from "react";
import styled from "styled-components";

interface PaginationProps {
  current: number;
  total: number;
}

const Pagination = ({ current, total }: PaginationProps) => {
  return (
    <PaginationWrapper>
      <PageNum>{`${current} / ${total}`}</PageNum>
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  margin-top: 30px;
  font-size: 14px;
  color: #666;
  text-align: center;
`;

const PageNum = styled.span`
  font-weight: 500;
`;
