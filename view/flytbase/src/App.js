import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import LogInPage from "./pages/login/LogInPage";
import SignInPage from "./pages/signin/SignInPage";
import PrivateRoutes from "./utils/auth/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </div>
  );
}

export default App;
