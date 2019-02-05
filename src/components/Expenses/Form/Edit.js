import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Form from "./Form";
import { updateService } from "../../../store/expenses";

const EditForm = props => (
  <Form onSubmit={props.updateService} values={props.values}>
    <button type="submit">Update service</button>
    <button type="button" onClick={() => props.onCancelEdit()}>
      Cancel
    </button>
  </Form>
);

EditForm.propTypes = {
  values: PropTypes.any,
  onCancelEdit: PropTypes.func,
  updateService: PropTypes.func,
  onSubmitClick: PropTypes.func
};

export default connect(
  null,
  { updateService }
)(EditForm);
