import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomeLayout = () => {
    return(
        <div className="bg-gray-400 min-h-screen flex flex-col">
            <Header/>
            <main className="flex-grow">
              <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}
export default HomeLayout;