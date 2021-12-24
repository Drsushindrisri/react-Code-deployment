import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./header";
import "./index.css";
import { Routes } from "./routes";
import { uid } from "react-uid";
import {
  SpecialitiesHandleContext,
  SpecialitiesValueContext,
} from "./contexts/SpecalitiesList";
import { fetchData } from "./Api/Apis";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

require("dotenv").config();

function RootApp() {
  const [specialities, setSpecialities] = useState([]);

  const searchParams = new URLSearchParams(window.location.search);

  const user_id = searchParams.get("User_ID");

  const getPatientInfo = async () => {
    try {
      const patientInfo = await fetchData(
        "getPatientInfo",
        "reqBody",
        {
          patientId: user_id,
          organizationId: 23,
        },
        "Billing"
      );
      sessionStorage.setItem("userEmail", patientInfo?.data?.[0]?.email);
      sessionStorage.setItem("userNumber", patientInfo?.data?.[0]?.mobile);
      sessionStorage.setItem("userName", patientInfo?.data?.[0]?.patient_name);
    } catch (error) {}
  };

  useEffect(() => {
    getPatientInfo();
    sessionStorage.setItem("userId", user_id);
    sessionStorage.setItem("orgId", searchParams.get("Organization_ID"));
    sessionStorage.setItem("branchId", searchParams.get("Branch_ID"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="root-container">
      <ToastContainer />
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
