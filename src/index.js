import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignIn from "./js/signin";
import SignUp from "./js/signup";
import Dashboard from "./js/dashboard";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<SignUp />}>
        <Route path="signin" element={<SignIn />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
);