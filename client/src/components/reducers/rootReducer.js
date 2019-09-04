import { combineReducers } from 'redux';

import auth from './auth';
import common from './commonReducer';
import machine from './machineReducer';
import statistics from './statisticsReducer';

export default combineReducers({
    auth,
    common,
    machine,
    statistics
})