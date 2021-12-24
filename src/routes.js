import Blog from "./Blog";
import Blogs from "./Blogs";
import SlotBookAppointment from "./BookAppointment";
import PaymentConsultation from "./ConsultationPayment";
import DoctorsList from "./DoctorsList";
import Facebook from "./facebook";
import RaiseTicket from "./RaiseTicket";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Treatments from "./Treatments";
import VisualStories from "./VisualStories";

export const Routes = [
  { route: "/signUp", component: SignUp },
  { route: "/signIn", component: SignIn },
  { route: "/treatments", component: Treatments },
  { route: "/doctors-list", component: DoctorsList },
  { route: "/available-slots", component: SlotBookAppointment },
  { route: "/checkout", component: PaymentConsultation },
  { route: "/join-fb", component: Facebook },
  { route: "/blogs", component: Blogs },
  { route: "/stories", component: VisualStories },
  { route: "/blog/:id", component: Blog },
  { route: "/raise-ticket", component: RaiseTicket },
];
