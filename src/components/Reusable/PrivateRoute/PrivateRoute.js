import { Route } from "react-router";
import { useAuth } from "../../../auth/auth";

// Privet route create and export
export const PrivateRoute = ({ children, ...rest }) => {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
            (auth.user || localStorage.getItem("pro-fashion-user-id")) ? (
                    children
                ) : (
                    window.location.replace(`/login?for=${rest.location.pathname}`)
                )
            }
        />
    );
}


export default PrivateRoute