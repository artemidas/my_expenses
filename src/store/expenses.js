import request from "superagent";
import assign from "lodash/assign";
import { createAction, handleActions, combineActions } from "redux-actions";

const fetchServicesBegin = createAction("fetch/services/begin");
const fetchServicesSuccess = createAction("fetch/services/success");
const fetchServicesFailure = createAction("fetch/services/failure");

export function fetchServices() {
  return dispatch => {
    dispatch(fetchServicesBegin());
    return request.get("http://localhost:3001/expenses").end((err, res) => {
      if (err) {
        return dispatch(fetchServicesFailure(err));
      }
      return dispatch(fetchServicesSuccess(res.body));
    });
  };
}

const createServiceBegin = createAction("create/service/begin");
const createServiceSuccess = createAction("create/service/success");
const createServiceFailure = createAction("create/service/failure");

export function createService(body) {
  return (dispatch, getState) => {
    dispatch(createServiceBegin());
    return request
      .post("http://localhost:3001/expenses")
      .set("accept", "json")
      .send(body)
      .end((err, res) => {
        if (err) {
          return dispatch(createServiceFailure(err));
        }
        const store = getState();
        const updatedList = [].concat(store.expenses.list).concat(res.body);
        return dispatch(createServiceSuccess(updatedList));
      });
  };
}

const removeServiceSuccess = createAction("remove/service/success");
const removeServiceFailure = createAction("remove/service/failure");
/**
 * Removes service
 * @param {number} id - ID of the service
 */
export function removeServiceAction(id) {
  return (dispatch, getState) => {
    return request.delete(`http://localhost:3001/expenses/${id}`).end(err => {
      if (err) {
        return dispatch(removeServiceFailure(err));
      }
      const expenses = getState().expenses.list;
      const removed = expenses.filter(expense => expense.id !== id);
      return dispatch(removeServiceSuccess(removed));
    });
  };
}

const defaultState = {
  list: null,
  item: {},
  isLoading: false,
  error: null
};

const servicesReducer = handleActions(
  {
    [combineActions(fetchServicesBegin, createServiceBegin)]: state =>
      assign({}, state, { isLoading: true }),
    [combineActions(fetchServicesSuccess, createServiceSuccess)]: (
      state,
      action
    ) =>
      assign({}, state, {
        list: action.payload,
        isLoading: false
      }),
    [combineActions(fetchServicesFailure, createServiceFailure)]: (
      state,
      action
    ) => assign({}, state, { error: action.payload, isLoading: false }),
    [removeServiceSuccess]: (state, action) =>
      assign({}, state, { list: action.payload })
  },
  defaultState
);

export default servicesReducer;
