import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import banner from "../assets/banner.png";

const Home = () => {

  return (
    <>
      <div className="bg-gray-400 py-10 flex flex-col justify-start items-center min-h-screen">
        <img src={banner} alt="Banner" className="w-3/4 mx-20 p-10"/>
        <Link to="/products" className="flex justify-center">
            <button className="mx-auto bg-rose-800 px-4 py-2 rounded-md font-bold text-white transition duration-700 hover:text-rose-800 hover:bg-gray-300">View More</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
