/** @jsx jsx */
import React from "react";
import { Field, reduxForm } from "redux-form";
import { jsx, css } from "@emotion/core";

const form = css`
  display: flex;
`;

const input = css`
  display: flex;
  flex-direction: column;
`;

const Form = props => {
  const _onSubmit = e => {
    e.preventDefault();
    props.handleSubmit();
    props.reset("service");
  };

  return (
    <form onSubmit={_onSubmit} css={form}>
      <div css={input}>
        <label htmlFor="name">Name</label>
        <Field name="name" component="input" type="text" />
      </div>
      <div css={input}>
        <label htmlFor="fee">Fee</label>
        <Field name="fee" component="input" type="number" />
      </div>
      <div css={input}>
        <label htmlFor="periodicity">Periodicity</label>
        <Field name="periodicity" component="select">
          <option>Select option</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </Field>
      </div>
      <button type="submit">Add service</button>
    </form>
  );
};

export default reduxForm({
  form: "service"
})(Form);
