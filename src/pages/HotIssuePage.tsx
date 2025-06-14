import React from "react";
import styled from "styled-components";
import HotIssue from "../HotIssue";

const HotIssuePage: React.FC = () => {
  return (
    <PageWrapper>
      <HotIssue />
    </PageWrapper>
  );
};

export default HotIssuePage;

const PageWrapper = styled.div`
  padding: 60px 0;
  text-align: center;
`;
