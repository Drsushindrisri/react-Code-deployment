import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./header";
import "./index.css";
import { Routes } from "./routes";
import { uid } from "react-uid";
import {
  SpecialitiesHandleContext,
  SpecialitiesValueContext,
} from "./contexts/SpecalitiesList";

require("dotenv").config();

function RootApp() {
  const [specialities, setSpecialities] = useState([]);

  const searchParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    sessionStorage.setItem("userId", searchParams.get("User_ID"));
    sessionStorage.setItem("orgId", searchParams.get("Organization_ID"));
    sessionStorage.setItem("branchId", searchParams.get("Branch_ID"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="root-container">
      <BrowserRouter>
        <Header />
        <Switch>
          <SpecialitiesValueContext.Provider value={specialities}>
            <SpecialitiesHandleContext.Provider
              value={(newList) => setSpecialities(newList)}
            >
              {Routes.map((routeItem, index) => (
                <Route
                  exact
                  path={routeItem.route}
                  component={routeItem.component}
                  key={uid(index)}
                />
              ))}
            </SpecialitiesHandleContext.Provider>
          </SpecialitiesValueContext.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<RootApp />, document.getElementById("root"));
