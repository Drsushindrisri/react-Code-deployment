import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Treatments from "./Treatments";
import DoctorsList from "./DoctorsList";
import Header from "./header";
import SlotBookAppointment from "./BookAppointment";
import PaymentConsultation from "./ConsultationPayment";
import "./index.css";
import Facebook from "./facebook";
import Blog from "./Blog";
import Blogs from "./Blogs";
import VisualStories from "./VisualStories";

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
          <Route exact path="/" component={Treatments} />
          <Route exact path="/doctors-list" component={DoctorsList} />
          <Route
            exact
            path="/Slot-BookAppointment"
            component={SlotBookAppointment}
          />
          <Route exact path="/OrgDoctorFees" component={PaymentConsultation} />
          <Route exact path="/joinGroup" component={Facebook} />
          <Route exact path="/blogs" component={Blogs} />
          <Route exact path="/stories" component={VisualStories} />
          <Route exact path="/blog/:title" component={Blog} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<RootApp />, document.getElementById("root"));
