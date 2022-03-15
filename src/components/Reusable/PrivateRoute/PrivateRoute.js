import jwtDecode from "jwt-decode";
import { Route } from "react-router";
import { useAuth } from "../../../auth/auth";

// Privat route create and export
const PrivateRoute = ({ children, ...rest }) => {
    const currentUserToken = localStorage.getItem("pro-fashion-user-id")
    const currentUser = currentUserToken && jwtDecode(currentUserToken)
    const user = useAuth().user

    return (
        <Route
            {...rest}
            render={({ location }) =>
                localStorage.getItem("pro-fashion-user-id") ? (
                    user ? (
                        <>
                            {
                                currentUser.email === user?.email ?
                                    children
                                    :
                                    <>
                                        In use auth
                                        window.location.replace(`/login?for=${rest.location.pathname}`)
                                    </>
                            }
                        </>
                    )
                        :
                        <>
                            User Not Found!
                        </>
                ) : (
                    <>
                        {
                            window.location.replace(`/login?for=${rest.location.pathname}`)
                        }
                    </>
                )
            }
        />
    );
}


export default PrivateRoute