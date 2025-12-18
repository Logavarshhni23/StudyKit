import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const user = sessionStorage.getItem("user");
  const role = sessionStorage.getItem("role");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="bg-rose-900 text-white font-bold">
      <div className="flex justify-between items-center p-5">
        <p className="text-4xl font-bold">StudyKit</p>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:bg-white hover:text-rose-900 p-2 rounded-md">Home</Link>
          <Link to="/products" className="hover:bg-white hover:text-rose-900 p-2 rounded-md">Products</Link>
          <Link to="/cart" className="hover:bg-white hover:text-rose-900 p-2 rounded-md">Cart</Link>
          {role === "admin" && (
            <Link to="/admin" className="hover:bg-white hover:text-rose-900 p-2 rounded-md">Admin</Link>
          )}
          <Link to="/orders" className="hover:bg-white hover:text-rose-900 p-2 rounded-md">Orders</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:bg-white hover:text-rose-900 p-2 rounded-md">Login</Link>
              <Link to="/register" className="hover:bg-white hover:text-rose-900 p-2 rounded-md">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-white text-rose-900 px-3 py-1 rounded-md">Logout</button>
          )}
        </div>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-rose-900 px-5 pb-5">
          <div className="flex flex-col gap-4">
            <Link to="/" className="hover:bg-white hover:text-rose-900 p-2 rounded-md" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/products" className="hover:bg-white hover:text-rose-900 p-2 rounded-md" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link to="/cart" className="hover:bg-white hover:text-rose-900 p-2 rounded-md" onClick={() => setIsMenuOpen(false)}>Cart</Link>
            {role === "admin" && (
              <Link to="/admin" className="hover:bg-white hover:text-rose-900 p-2 rounded-md" onClick={() => setIsMenuOpen(false)}>Admin</Link>
            )}
            <Link to="/orders" className="hover:bg-white hover:text-rose-900 p-2 rounded-md" onClick={() => setIsMenuOpen(false)}>Orders</Link>
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="hover:bg-white hover:text-rose-900 p-2 rounded-md" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="hover:bg-white hover:text-rose-900 p-2 rounded-md" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            ) : (
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="bg-white text-rose-900 px-3 py-1 rounded-md">Logout</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
