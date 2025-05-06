import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PrivateRoute from "./Routes/PrivateRoute";
import Login from "./Pages/auth/LoginPage/Login";
import Register from "./Pages/auth/RegisterPage/Register";
import ForgotPassword from "./Pages/auth/Forgotpass/ForgotPassword";
import UpdatePassword from "./Pages/auth/UpdatePassword/UpdatePassword";
import VerifyEmail from "./Pages/auth/VerifyEmailPage/VerifyEmail";
import ResetPassword from "./Pages/auth/ResetPassword/ResetPassword";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Transction from "./Pages/Transctions/Transction";
import Budget from "./Pages/Budget/Budget";
import Expance from "./Pages/Expance/Expance";
import Categories from "./Pages/Categories/Categories";
import Myprofile from "./Pages/Profile/Myprofile/Myprofile";
import EditProfile from "./Pages/Profile/Editprofile/Editprofile";
import Analysis from "./Pages/Analysis/Analysis";
import CreateProfile from "./Pages/Profile/CreateProfile/CreateProfile";

function App() {
  const publicRoute = [
    { path: "/login", component: <Login /> },
    { path: "/register", component: <Register /> },
    { path: "/forgot-password", component: <ForgotPassword /> },
    { path: "/update-password", component: <UpdatePassword /> },
    { path: "/verify-otp", component: <VerifyEmail /> },
    { path: "/reset-password/:token", component: <ResetPassword /> },
  ];

  const privateRoute = [
    { path: "/", component: <Home /> },
    { path: "/dashboard", component: <Dashboard /> },
    {path: "/transactions", component: <Transction /> },
    {path: "/analysis", component: <Analysis /> },
    {path: "/budgets", component: <Budget /> },
    {path: "/expenses", component: <Expance /> },
    {path: "/categories", component: <Categories /> },
    {path: "/profile/", component: <Myprofile /> },
    {path: "/create-profile", component: <CreateProfile /> },
    {path: "/edit-profile", component: <EditProfile /> },
  ];

  return (
    <div className="App">
      <Router>
        
          <Routes>
            {/* Public Routes */}
            {publicRoute.map((item, index) => (
              <Route key={index} path={item.path} element={item.component} />
            ))}

            {/* Private Routes */}
            {privateRoute.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<PrivateRoute>{item.component}</PrivateRoute>}
              />
            ))}
          </Routes>
      </Router>
    </div>
  );
}

export default App;
