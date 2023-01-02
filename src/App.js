import { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import AuthPage from "./components/UI/auth/AuthPage";
import ForgotPassword from "./components/UI/auth/ForgotPassword";
import LoginPage from "./components/UI/auth/LoginPage";
import SingupPage from "./components/UI/auth/SingupPage";
import Layout from "./components/UI/layout/Layout";
import PageNotFound from "./components/UI/PageNotFound";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-bootstrap";


export const  Protected = ({ isSignedIn, children }) => {
  if (!isSignedIn) {
    return <Navigate to="/login" replace />
  }
  return children
}




function App() {
  const [isSignedIn, setIsSignedIn] = useState(null)


  return (
    <div >
      <ToastContainer position="top-right"/>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/login" element={<LoginPage setIsSignedIn={setIsSignedIn}/>} />
          <Route path="/singup" element={<SingupPage />} />
          <Route path="/forgot" element={<ForgotPassword />} />

          <Route
            path="/home"
            element={
              <Protected isSignedIn={isSignedIn}>
                <Layout />
              </Protected>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
