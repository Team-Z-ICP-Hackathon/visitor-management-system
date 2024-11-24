
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (

    <>
   
    <div>
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <h1 className="text-4xl font-extrabold text-orange-500">SecurePass</h1>
        <div className="flex space-x-8">
        <Link to="/" className="hover:text-orange-500 transition duration-300">
            Home
          </Link>
          <Link to="/check-out" className="hover:text-orange-500 transition duration-300">
            Check-out
          </Link>
  
        </div>
      </nav>

      
    
    </div>
    </>
  );
};

export default Navbar;
