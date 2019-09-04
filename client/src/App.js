import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from './components/utils/setAuthorizationToken';
import Login from './components/pages/login/Login';
import DashboardPanel from './components/pages/dashboard/DashboardPanel';
import MachinePanel from './components/pages/machine/MachinePanel';
import Statistics from './components/pages/statistics';
import { setCurrentUser } from './components/actions/authActions';
import rootReducer from './components/reducers/rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import RegisterUserModal from './components/modals/RegisterUserModal';
import './css/panel.css';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      isRefreshed: false
    }
  }

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <BrowserRouter >
            <div className="content">
              <Route exact path='/' component={Login} />
              <Route exact path='/login' component={Login} />
              <Route exact path="/panel" render={() => {
                return localStorage.jwtToken ? (<Route component={DashboardPanel} />)
                  : (<Route component={Login} />)
              }} />
              <Route exact path="/machine/:machineID" render={() => {
                return localStorage.jwtToken ? (<Route component={MachinePanel} />)
                  : (<Route component={Login} />)
              }} />
              <Route exact path="/machine/:machineID/statistics" render={() => {
                return localStorage.jwtToken ? (<Route component={Statistics} />)
                  : (<Route component={Login} />)
              }} />

            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
