import { BrowserRouter as Router, Routes, Route, useLocation, matchPath } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import useAdminRoutes from "./components/routes/adminRoutes";
// import useUserRoutes from "./components/routes/userRoutes";
import { Toaster } from "react-hot-toast";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

function Layout() {
  const location = useLocation();
  const adminRoutes = useAdminRoutes();
  // const userRoutes = useUserRoutes();

  const isLoginOrRegisterPage =
    location.pathname === "/admin/login" ||
    location.pathname === "/register" ||
    location.pathname === "/password/forgot" ||
    matchPath("/password/reset/:token", location.pathname);


  return (
    <div className="App">
      <Toaster position="top-center" />
      {isLoginOrRegisterPage ? (
        <Routes>
          <Route path="/admin/login" element={<Login position="center center" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
        </Routes>
      ) : (
        <div className="wrapper">
          <Sidebar />
          <div className="main-panel">
            <Header />
            <div className="container">
              <Routes>
                {adminRoutes}
                {/* {userRoutes} */}
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
