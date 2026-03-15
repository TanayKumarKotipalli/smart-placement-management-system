import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Portal from "./pages/Portal";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RegisterStudent from "./pages/RegisterStudent";
import RegisterRecruiter from "./pages/RegisterRecruiter";
import RegisterAdmin from "./pages/RegisterAdmin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
// Recruiter Pages
import RecruiterLayout from "./pages/recruiter/RecruiterLayout";
import RecruiterHome from "./pages/recruiter/RecruiterHome";
import PostJob from "./pages/recruiter/PostJob";
import MyJobs from "./pages/recruiter/MyJobs";
import MatchedCandidates from "./pages/recruiter/MatchedCandidates";
import Shortlisted from "./pages/recruiter/Shortlisted";
import Interviews from "./pages/recruiter/Interviews";
import Reports from "./pages/recruiter/Reports";

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Portal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* RECRUITER ROUTES */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route index element={<RecruiterHome />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="my-jobs" element={<MyJobs />} />
          <Route path="matched" element={<MatchedCandidates />} />
          <Route path="shortlisted" element={<Shortlisted />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* REGISTER ROUTES */}
        <Route path="/register/student" element={<RegisterStudent />} />
        <Route path="/register/recruiter" element={<RegisterRecruiter />} />
        <Route path="/register/admin" element={<RegisterAdmin />} />
        {/* PASSWORD ROUTES*/}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

      </Routes>
    </Router>
  );
}

export default App;