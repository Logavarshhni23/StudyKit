import {Navigate} from "react-router-dom";
const AdminRoute = ({children}) => {
    const isLoggedin =sessionStorage.getItem("isLoggedIn");
    const role = sessionStorage.getItem("role");
    return(
        (isLoggedin) && (role==="admin")  ? children : <Navigate to="/"/>
    )
}
export default AdminRoute;