import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import Root from "./Components/Home/Root";
import UserHome from './Components/User/Root'
import  {Login} from "./Components/Auth/Auth";
import { useSelector } from "react-redux";
const App = () =>{
    const account = useSelector((state) => state.auth.account);
    return (
      <Router>
        <Switch>
          <ProtectedRoute exact path='/Auth/Login' component={Login}></ProtectedRoute>
          {
          account ?
          <Route path='/'><UserHome/></Route>
          :<Route path='/' component={Root}></Route>
          }
        </Switch>
      </Router>
    );
  }

export default App;
