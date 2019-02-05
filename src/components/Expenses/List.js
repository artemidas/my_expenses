/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { jsx } from "@emotion/core";
import styles from "./styles";
import { removeServiceAction } from "../../store/expenses";
import EditForm from "./Form/Edit";

class List extends Component {
  state = {
    editing: null
  };

  static getDerivedStateFromProps(nextProps, nextState) {
    if (!nextProps.isUpdating) {
      return { editing: nextState.editing };
    }
    return { editing: null };
  }

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    services: PropTypes.arrayOf(PropTypes.object),
    removeService: PropTypes.func.isRequired
  };

  render() {
    const { isLoading } = this.props;
    if (isLoading) {
      return "Loading...";
    }
    const { services, removeService } = this.props;
    const { editing } = this.state;
    return (
      <div css={styles.list}>
        {services.map(service => (
          <div key={`service-${service.id}`}>
            {editing === service.id ? (
              <div>
                <EditForm
                  values={service}
                  onCancelEdit={() => this.setState({ editing: null })}
                />
              </div>
            ) : (
              <p>
                {service.name} - Fee {service.fee} - Periodicity{" "}
                {service.periodicity}
              </p>
            )}
            <button type="button" onClick={() => removeService(service.id)}>
              X
            </button>
            <button
              type="button"
              onClick={() => this.setState({ editing: service.id })}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  services: state.expenses.list,
  isLoading: state.expenses.isLoading,
  isUpdating: state.expenses.isUpdating
});

const mapDispatchToProps = {
  removeService: removeServiceAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
