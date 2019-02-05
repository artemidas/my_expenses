import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Form from "./Form";
import { createService } from "../../../store/expenses";

const initialValues = {
  name: "",
  fee: 0,
  periodicity: ""
};

const CreateForm = props => {
  return (
    <Form onSubmit={props.createService} values={initialValues}>
      <button type="submit">Add service</button>
    </Form>
  );
};

CreateForm.propTypes = {
  createService: PropTypes.func
};

export default connect(
  null,
  {
    createService
  }
)(CreateForm);
