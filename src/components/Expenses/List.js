/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { jsx } from "@emotion/core";
import styles from "./styles";
import { removeServiceAction } from "../../store/expenses";

class List extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    services: PropTypes.arrayOf(PropTypes.object),
    removeService: PropTypes.func.isRequired
  };

  render() {
    const { isLoading } = this.props;
    if (isLoading) {
      return "Loading...";
    }
    const { services, removeService } = this.props;
    return (
      <ul css={styles.list}>
        {services.map(service => (
          <li key={`service-${service.id}`}>
            {service.name} - Fee
            {service.fee} - Periodicity
            {service.periodicity}
            <button type="button" onClick={() => removeService(service.id)}>
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
  removeService: removeServiceAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
