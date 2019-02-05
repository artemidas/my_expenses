import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import CreateForm from "../src/components/Expenses/Form/Create";
import List from "../src/components/Expenses/List";
import { fetchServices } from "../src/store/expenses";
import Page, { Content } from "../src/components/Layout/Page";

const Total = styled.p`
  grid-column: 4 / 5;
  grid-row: 2 / 2;
`;

class Expenses extends Component {
  static propTypes = {
    services: PropTypes.array,
    fetchServices: PropTypes.func.isRequired
  };
  static getInitialProps(props) {
    props.reduxStore.dispatch(fetchServices());
    return {};
  }

  componentDidMount() {
    const { services, fetchServices } = this.props;
    if (services === null) {
      fetchServices();
    }
  }

  _getTotal = () => {
    let total = 0;
    if (this.props.services !== null)
      this.props.services.forEach(service => (total += Number(service.fee)));
    return total;
  };

  render() {
    return (
      <Page>
        <Content>
          <h1>My expenses</h1>
          <CreateForm />
          <List />
        </Content>
        <Total>Total: {this._getTotal()}</Total>
      </Page>
    );
  }
}

export default connect(
  state => ({
    services: state.expenses.list
  }),
  {
    fetchServices
  }
)(Expenses);
