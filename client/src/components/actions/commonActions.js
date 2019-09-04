import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { 
    SET_MACHINE_DATA,
    SET_PANEL_DATA
} from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import axios from 'axios';

var base = 'http://localhost:4000';
var user = jwtDecode(localStorage.getItem('jwtToken')).username;

export function getMachineData(machineID = 0) {
    return dispatch => {
        var panelMachinePanel = {};

        axios.all([
            axios.get(`${base}/api/machine/${machineID}/info`),
            axios.get(`${base}/api/products/${machineID}`),
            axios.get(`${base}/api/orders/machineID/${machineID}`)
        ]).then(responseAll => {
            panelMachinePanel['machineInfo'] = responseAll[0].data;
            panelMachinePanel['products'] = responseAll[1].data;
            panelMachinePanel['orders'] = responseAll[2].data;

            dispatch(setCurrentMachineData(panelMachinePanel));
        });
    }
}

export function getPanelData() {
    return dispatch => {
        var panel = {};
        
        axios.all([
            axios.get(`${base}/api/machines/${user}`),
            axios.get(`${base}/api/orders/${user}`),
            axios.get(`${base}/api/expenses/${user}`),
            axios.get(`${base}/api/income/${user}`),
            axios.get(`${base}/api/messages/${user}`)
        ]).then(responseAll => {
            var expenses = responseAll[2].data;
            var totalExpenses =  (parseFloat(expenses.rent) + parseFloat(expenses.other));

            panel['machines'] = responseAll[0].data;
            panel['orders'] = responseAll[1].data;
            panel['expenses'] = expenses;
            panel['totalExpenses'] = totalExpenses;
            panel['income'] = Math.round(responseAll[3].data.income*100, 2)/100;
            panel['messages'] = responseAll[4].data;

            dispatch(setCurrentPanelData(panel));
        });
    }
}

export function setCurrentMachineData(machineInfo) {
    return {
        type: SET_MACHINE_DATA,
        machineInfo
    }
}

export function setCurrentPanelData(panel) {
    return {
        type: SET_PANEL_DATA,
        panel
    }
}