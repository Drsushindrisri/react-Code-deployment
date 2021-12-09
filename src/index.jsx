import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./header";
import "./index.css";
import { Routes } from "./routes";
import { uid } from "react-uid";

require("dotenv").config();

function RootApp() {
  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      sessionStorage.setItem("userId", window.location.pathname);
    }
  }, []);

  const condition =
    window.location.pathname.includes("available-slots") ||
    window.location.pathname.includes("checkout") ||
    window.location.pathname.includes("blog");

  return (
    <div className="root-container">
      <BrowserRouter>
        <Header showBack={condition} />
        <Switch>
          {Routes.map((routeItem, index) => (
            <Route
              exact
              path={routeItem.route}
              component={routeItem.component}
              key={uid(index)}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<RootApp />, document.getElementById("root"));
