import { Component } from "react";
import { connect } from "react-redux";
import Form from "../src/components/Expenses/Form";
import List from "./../src/components/Expenses/List";
import { fetchServices, createService } from "./../src/store/expenses";
import Page from "../src/components/Layout/Page";

class Expenses extends Component {
  static getInitialProps(props) {
    props.reduxStore.dispatch(fetchServices());
    return {};
  }

  componentDidMount() {
    if (this.props.services === null) {
      this.props.fetchServices();
    }
  }

  _addService = (values, dispatch) => {
    dispatch(createService(values));
  };

  _getTotal = () => {
    let total = 0;
    if (this.props.services !== null)
      this.props.services.forEach(service => (total += Number(service.fee)));
    return total;
  };

  render() {
    return (
      <Page>
        <h1>My expenses</h1>
        <Form onSubmit={this._addService} />
        <List />
        <p>Total: {this._getTotal()}</p>
      </Page>
    );
  }
}

export default connect(
  state => ({ services: state.expenses.list }),
  {
    fetchServices
  }
)(Expenses);
