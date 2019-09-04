import { SET_MACHINE_DATA, SET_PANEL_DATA } from "../actions/types";
import isEmpty from "lodash/isEmpty";

const initialState = {
  products: [],
  orders: [],
  machineInfo: {
    _id: "",
    machineID: 1,
    products: []
  },
  showProductModal: false,
  machineID: 0
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_MACHINE_DATA:
      return {
        machines: action.machineInfo
      };

    default:
      return state;
  }
};
