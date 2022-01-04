import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./header";
import "./index.css";
import { Routes } from "./routes";
import { uid } from "react-uid";
import { SpecialitiesValueContext } from "./contexts/SpecalitiesList";
import { fetchData } from "./Api/Apis";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

require("dotenv").config();

function RootApp() {
  const [specialities, setSpecialities] = useState([]);

  const searchParams = new URLSearchParams(window.location.search);

  const user_id = searchParams.get("User_ID");

  useEffect(() => {
    getPatientInfo();
    getSpecialities();
    sessionStorage.setItem("userId", user_id);
    sessionStorage.setItem("orgId", searchParams.get("Organization_ID"));
    sessionStorage.setItem("branchId", searchParams.get("Branch_ID"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPatientInfo = async () => {
    try {
      const patientInfo = await fetchData("getPatientInfo", "reqBody", {
        patientId: user_id,
        OrganizationID: sessionStorage.getItem("orgId"),
      });
      sessionStorage.setItem("userEmail", patientInfo?.data?.[0]?.email);
      sessionStorage.setItem("userNumber", patientInfo?.data?.[0]?.mobile);
      sessionStorage.setItem("userName", patientInfo?.data?.[0]?.patient_name);
    } catch (error) {}
  };

  async function getSpecialities() {
    try {
      const resp = await fetchData("getPrimarySpecialtyList", "reqBody", {
        OrganizationID: sessionStorage.getItem("orgId"),
      });
      if (resp?.data)
        setSpecialities([
          { speciality_id: "all", speciality_name: "All" },
          ...resp?.data,
        ]);
    } catch (error) {}
  }

  return (
    <div className="root-container">
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Switch>
          <SpecialitiesValueContext.Provider value={specialities}>
            {Routes.map((routeItem, index) => (
              <Route
                exact
                path={routeItem.route}
                component={routeItem.component}
                key={uid(index)}
              />
            ))}
          </SpecialitiesValueContext.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<RootApp />, document.getElementById("root"));
