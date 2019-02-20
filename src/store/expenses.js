import request from "superagent";
import assign from "lodash/assign";
import filter from "lodash/filter";
import concat from "lodash/concat";
import { createAction, handleActions, combineActions } from "redux-actions";

const fetchServicesBegin = createAction("fetch/services/begin");
const fetchServicesSuccess = createAction("fetch/services/success");
const fetchServicesFailure = createAction("fetch/services/failure");

export function fetchServices() {
  return dispatch => {
    dispatch(fetchServicesBegin());
    return request.get("http://localhost:3000/api/expenses").end((err, res) => {
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
  return dispatch => {
    dispatch(createServiceBegin());
    return request
      .post("http://localhost:3000/api/expenses")
      .set("accept", "json")
      .send(body)
      .end((err, res) => {
        if (err) {
          return dispatch(createServiceFailure(err));
        }
        return dispatch(createServiceSuccess(res.body));
      });
  };
}

const updateServiceBegin = createAction("update/service/begin");
const updateServiceSuccess = createAction("update/service/success");
const updateServiceFailure = createAction("update/service/failure");

export function updateService(body) {
  return dispatch => {
    dispatch(updateServiceBegin());
    return request
      .patch(`http://localhost:3000/api/expenses/${body.id}`)
      .set("accept", "json")
      .send(body)
      .end((err, res) => {
        if (err) {
          return dispatch(updateServiceFailure(err));
        }
        return dispatch(updateServiceSuccess(res.body));
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
  return dispatch => {
    return request
      .delete(`http://localhost:3000/api/expenses/${id}`)
      .end(err => {
        if (err) {
          return dispatch(removeServiceFailure(err));
        }
        return dispatch(removeServiceSuccess(id));
      });
  };
}

const defaultState = {
  list: null,
  item: {},
  isLoading: false,
  isUpdating: false,
  error: null
};

const servicesReducer = handleActions(
  {
    [combineActions(fetchServicesBegin, createServiceBegin)]: state =>
      assign({}, state, { isLoading: true }),
    [fetchServicesSuccess]: (state, action) =>
      assign({}, state, {
        list: action.payload,
        isLoading: false,
        isUpdating: false
      }),
    [updateServiceBegin]: state => assign({}, state, { isUpdating: true }),
    [updateServiceSuccess]: (state, action) => {
      const updatedList = state.list.map(expense =>
        expense.id === action.payload.id ? (expense = action.payload) : expense
      );
      return assign({}, state, {
        list: updatedList,
        isLoading: false,
        isUpdating: false
      });
    },
    [removeServiceSuccess]: (state, action) => {
      const removed = filter(
        state.list,
        expense => expense.id !== action.payload
      );
      return assign({}, state, { list: removed, isLoading: false });
    },
    [createServiceSuccess]: (state, action) => {
      const updated = concat(state.list, action.payload);
      return assign({}, state, { list: updated, isLoading: false });
    },
    [combineActions(
      fetchServicesFailure,
      createServiceFailure,
      updateServiceFailure
    )]: (state, action) =>
      assign({}, state, { error: action.payload, isLoading: false })
  },
  defaultState
);

export default servicesReducer;
