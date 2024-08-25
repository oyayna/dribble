import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Authentication/AuthContext";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import ForgetPassword from "./Authentication/ForgetPassword";
import ResetPassword from "./Authentication/ResetPassword";
// import ProtectedRoute from "./Authentication/ProtectedRoute";
import Home from "./Pages/Home";
import SearchDesigners from "./Pages/SearchDesigners";
import PostJob from "./Pages/PostJob";
import Jobs from "./Pages/Jobs";
import Pro from "./Pages/Pro";
import Shots from "./Pages/Shots";
import BoostedShots from "./Pages/BoostedShots";
import Boosts from "./Pages/Boosts";
import Likes from "./Pages/Likes";
import About from "./Pages/About";
import Drafts from "./Pages/Drafts";
import General from "./Pages/Profile/General";
import EditProfile from "./Pages/Profile/EditProfile";
import Password from "./Pages/Profile/Password";
import SocialProfiles from "./Pages/Profile/SocialProfiles";
import Company from "./Pages/Profile/Company";
import Sessions from "./Pages/Profile/Sessions";
import DataExport from "./Pages/Profile/DataExport";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route
            path="/forget-password/reset-password-confirm/"
            element={<ResetPassword />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/designers" element={<SearchDesigners />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/new" element={<PostJob />} />
          <Route path="/pro" element={<Pro />} />
          <Route path="/shots" element={<Shots />} />
          <Route path="/boostedshots" element={<BoostedShots />} />
          <Route path="/boosts" element={<Boosts />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/drafts" element={<Drafts />} />
          <Route path="/about" element={<About />} />
          <Route path="/general" element={<General />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/edit-password" element={<Password />} />
          <Route path="/social-profiles" element={<SocialProfiles />} />
          <Route path="/edit-company" element={<Company />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/export-data" element={<DataExport />} />
          {/* <Route element={<ProtectedRoute />}></Route> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
