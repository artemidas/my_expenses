/** @jsx jsx */
import { jsx } from "@emotion/core";
import styles from "../styles";
import PropTypes from "prop-types";
import { Formik } from "formik";

const Form = props => {
  return (
    <Formik
      onSubmit={(values, { resetForm }) => {
        props.onSubmit(values);
        resetForm(props.values);
      }}
      initialValues={props.values}
    >
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit} css={styles.form}>
          <div css={styles.input}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              value={values.name}
            />
          </div>
          <div css={styles.input}>
            <label htmlFor="fee">Fee</label>
            <input
              name="fee"
              type="number"
              onChange={handleChange}
              value={values.fee}
            />
          </div>
          <div css={styles.input}>
            <label htmlFor="periodicity">Periodicity</label>
            <select
              name="periodicity"
              onChange={handleChange}
              value={values.periodicity}
            >
              <option>Select option</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          {props.children}
        </form>
      )}
    </Formik>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  values: PropTypes.any,
  children: PropTypes.any
};

export default Form;
