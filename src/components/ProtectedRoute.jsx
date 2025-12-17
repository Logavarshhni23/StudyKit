import {Navigate} from "react-router-dom";
const ProtectedRoute = ({children}) => {
    const isLoggedin =sessionStorage.getItem("isLoggedIn");
    return(
        isLoggedin ? children : <Navigate to="/login"/>
    )
}
export default ProtectedRoute;