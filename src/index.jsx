import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { App } from "./AppNew";
import DoctorsList from "./DoctorsList";
import Header from "./header";
import SlotBookAppointment from "./BookAppointment";

import PaymentConsultation from "./Consultationpayment";
import "./index.css";
import Facebook from "./facebook";
import Blog from "./Blog";
import Blogs from "./Blogs";

require("dotenv").config();

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
          <Route exact path="/joinGroup" component={Facebook} />
          <Route exact path="/blogs" component={Blogs} />
          <Route exact path="/blog" component={Blog} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<RootApp />, document.getElementById("root"));
