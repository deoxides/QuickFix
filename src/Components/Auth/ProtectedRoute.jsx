import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const isAuthenticated = useSelector((state) => state.auth.account);
    return (
      <Route
        {...restOfProps}
        render={(props) =>
          isAuthenticated ?  <Redirect to="/" /> : <Component {...props} />
        }
      />
    );
  }
  export default ProtectedRoute;