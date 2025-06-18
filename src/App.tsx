import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import EnhancedNavbar from './components/EnhancedNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import SuccessStories from './pages/SuccessStories';
import Jobs from './pages/Jobs';
import Membership from './pages/Membership';
import Contact from './pages/Contact';
import ConnectingWithAlumni from './pages/ConnectingWithAlumni';
import AlumniDirectory from './components/AlumniDirectory';
import { EnhancedRegistrationModal } from './components/EnhancedRegistrationModal';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <EnhancedNavbar onRegister={() => setIsRegistrationOpen(true)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onRegister={() => setIsRegistrationOpen(true)} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/alumni-directory" element={<AlumniDirectory />} />
            <Route path="/connecting-with-alumni" element={<ConnectingWithAlumni />} />
            <Route path="/membership" element={<Membership onRegister={() => setIsRegistrationOpen(true)} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <EnhancedRegistrationModal 
          isOpen={isRegistrationOpen} 
          onClose={() => setIsRegistrationOpen(false)} 
        />
      </div>
    </AuthProvider>
  );
}

export default App;