/* @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { jsx } from "@emotion/core";
import styles from "./styles";
import { removeService } from "./../../store/expenses";

class List extends Component {
  static propTypes = {
    removeService: PropTypes.func.isRequired
  };

  render() {
    if (this.props.isLoading) {
      return "Loading...";
    }
    const { services } = this.props;
    return (
      <ul css={styles.list}>
        {services.map((service, index) => (
          <li key={`service-${index}`}>
            {service.name} - Fee {service.fee} - Periodicity{" "}
            {service.periodicity}
            <button onClick={() => this.props.removeService(service.id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  services: state.expenses.list,
  isLoading: state.expenses.isLoading
});

const mapDispatchToProps = {
  removeService
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
