/* @jsx jsx */
import React from "react";
import Header from "./Header";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 60px 1fr 1fr 100px;
  grid-gap: 1rem;
`;

const Content = styled.div`
  grid-row: 2 / 4;
  grid-column: 1 / 4;
`;

const Page = props => {
  return (
    <Container>
      <Header />
      <Content>{props.children}</Content>
    </Container>
  );
};

export default Page;
