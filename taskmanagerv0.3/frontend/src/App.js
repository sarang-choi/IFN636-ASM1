import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Incidents from './pages/Incidents';
import Casualties from './pages/Casualties';
import Assets from './pages/Assets';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/casualties" element={<Casualties />} />
        <Route path="/assets" element={<Assets />} />
      </Routes>
    </Router>
  );
}

export default App;
