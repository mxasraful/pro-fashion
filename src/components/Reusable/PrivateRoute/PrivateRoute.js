import jwtDecode from "jwt-decode";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../../auth/auth";

// Privat route create and export
const PrivateRoute = ({ children, ...rest }) => {
    const currentUserToken = localStorage.getItem("pro-fashion-user-id")
    const currentUser = jwtDecode(currentUserToken)
    const user = useAuth().user
    console.log(currentUserToken)
    console.log(currentUser)
    console.log(user)

    console.log(children)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                currentUserToken ? (
                    user && (
                        <>
                            {
                                currentUser.email === user?.email ?
                                    children
                                    :
                                    window.location.replace(`/login?for=${rest.location.pathname}`)
                            }
                        </>
                    )
                ) : (
                    window.location.replace(`/login?for=${rest.location.pathname}`)
                )
            }
        />
    );
}


export default PrivateRoute