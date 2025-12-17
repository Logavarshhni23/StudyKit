import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const user = sessionStorage.getItem("user");
  const role = sessionStorage.getItem("role");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center font-bold bg-rose-900 p-5 text-white">
      <p className="text-4xl font-bold">StudyKit</p>

      <div className="flex gap-6 items-center">
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
    </div>
  );
};

export default Header;
