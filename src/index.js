import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { App } from "./AppNew";
import DoctorsList from "./DoctorsList";
import Header from "./header";
import SlotBookAppointment from "./BookAppointment";

import PaymentConsultation from "./Consultationpayment";
import "./index.css";

function RootApp() {
  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      sessionStorage.setItem("userId", window.location.pathname);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/doctors-list" component={DoctorsList} />
          <Route
            exact
            path="/Slot-BookAppointment"
            component={SlotBookAppointment}
          />
          <Route exact path="/OrgDoctorFees" component={PaymentConsultation} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<RootApp />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
