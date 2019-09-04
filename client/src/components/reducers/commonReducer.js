import { SET_MACHINE_DATA, SET_PANEL_DATA } from "../actions/types";
import isEmpty from "lodash/isEmpty";

const initialState = {
  panel: {
    owner: "pesho",
    showMachineModal: false,
    showExpenseModal: false,
    showUserModal: false,
    machines: [],
    messages: [],
    orders: [],
    expenses: {
      rent: 0,
      electricity: 0,
      other: 0
    },
    income: 0,
    totalExpenses: 0
  }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_PANEL_DATA:
      return {
        panel: action.panel
      };

    default:
      return state;
  }
};
