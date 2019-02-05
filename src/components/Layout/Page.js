/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import PropTypes from 'prop-types'
import Header from "./Header";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 60px 1fr 1fr 100px;
  grid-gap: 1rem;
`;

export const Content = styled.div`
  grid-row: 2 / 4;
  grid-column: 1 / 4;
`;

const Page = props => (
  <Container>
    <Header /> {props.children}
  </Container>
);

Page.propTypes = {
  children: PropTypes.any
}

export default Page;
