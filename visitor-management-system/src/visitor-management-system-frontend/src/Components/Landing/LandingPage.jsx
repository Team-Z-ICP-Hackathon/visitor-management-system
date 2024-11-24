import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSmile, faShieldAlt, faCheckCircle, faSignOutAlt, faBell } from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white font-sans">
      {/* Header */}
      <header className={`flex items-center justify-between p-4 sticky top-0 z-10 transition-all duration-300 ${scrolled ? 'bg-gray-800 shadow-lg' : 'bg-transparent'}`}>
        <h1 className="text-4xl font-extrabold text-orange-500">SecurePass</h1>
        <nav className="hidden md:flex space-x-8">
          <Link to="#home" className="hover:text-orange-500 transition duration-300"><a href="#">Home</a></Link>
          <Link to="#about" className="hover:text-orange-500 transition duration-300"><a href="#aboutus">AboutUs</a></Link>
          <Link to="#Service " className="hover:text-orange-500 transition duration-300">Service</Link>
        </nav>
        <Link to="Dashboard/" className="bg-orange-500 text-black px-5 py-2 rounded-full shadow-md hover:bg-white hover:text-black transition duration-300">
          Admin
        </Link>
      </header>

      {/* Hero Section */}
      <section id="home" className="flex flex-col items-center justify-center h-screen text-center bg-black p-6">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">Welcome to SecurePass</h2>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl">Effortlessly secure and manage visitor access with cutting-edge technology designed for the modern world.</p>
        <Link to="/registration" className="bg-orange-500 text-black px-5 py-2 rounded-full shadow-md hover:bg-white hover:text-black transition duration-300">
          Register
        </Link>       
      </section>

      {/* About Us Section */}
      <section id="aboutus" className="py-20 bg-gray-900 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold mb-4 text-orange-500">About SecurePass</h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            At SecurePass, we prioritize security and efficiency in visitor management. Our advanced tech ensures seamless and safe visitor handling for organizations worldwide.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-4xl font-bold mb-8 text-orange-500">Our Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: faLock, title: 'Blockchain Security', description: 'Secure storage on the ICP blockchain.' },
              { icon: faSmile, title: 'Facial Recognition', description: 'Quick, real-time face matching.' },
              { icon: faShieldAlt, title: 'Privacy-Centric', description: 'Data access restricted to authorized users.' },
              { icon: faCheckCircle, title: 'Easy Check-In', description: 'Fast, contactless check-ins.' },
              { icon: faSignOutAlt, title: 'Seamless Checkout', description: 'Efficient visitor checkout process.' },
              { icon: faBell, title: 'Smart Notifications', description: 'Real-time visitor arrival alerts.' },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
                <FontAwesomeIcon icon={feature.icon} className="text-5xl text-orange-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 px-6">
          <div>
            <h3 className="text-lg font-bold text-white">SecurePass</h3>
            <p className="text-sm">Innovative Visitor Management Solutions</p>
          </div>
          <div>
            <h4 className="text-md font-bold text-white mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="#home" className="hover:text-orange-500 transition duration-300">Home</Link></li>
              <li><Link to="#about" className="hover:text-orange-500 transition duration-300">About Us</Link></li>
              <li><Link to="#features" className="hover:text-orange-500 transition duration-300">Service</Link></li>
              <li><Link to="/register" className="hover:text-orange-500 transition duration-300">Register</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-bold text-white mb-2">Stay Connected</h4>
            <form className="flex">
              <input type="email" placeholder="Your email" className="bg-gray-800 text-white rounded-l-lg px-4 py-2 focus:outline-none" required />
              <button type="submit" className="bg-orange-500 text-black rounded-r-lg px-4 py-2 hover:bg-orange-400 transition duration-300">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
          &copy; 2024 SecurePass. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
