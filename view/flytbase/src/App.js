import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import LogInPage from "./pages/auth-pages/login/LogInPage";
import SignInPage from "./pages/auth-pages/signin/SignInPage";
import PrivateRoutes from "./utils/auth/PrivateRoutes";
import ForgotPassword from "./pages/auth-pages/forgot-password/ForgotPassword";
import VerifyEmailNotification from "./pages/auth-pages/verify-email-notification/VerifyEmailNotification";
import VerifyEmail from "./pages/auth-pages/verify-email/VerifyEmail";
import ResetPassword from "./pages/auth-pages/reset-password/ResetPassword";
import Drones from "./pages/drones/Drones";
import Sites from "./pages/sites/Sites";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/drones" element={<Drones />} />
          <Route path="/sites" element={<Sites />} />

        </Route>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email-notification" element={<VerifyEmailNotification />} />
        <Route path="/verify-email/:verificationString" element={<VerifyEmail />} />
        <Route path="/reset-password/:passwordResetCode" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
