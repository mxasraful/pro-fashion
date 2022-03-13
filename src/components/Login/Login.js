import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/auth';
import './Login.css';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const Login = () => {

    const [visibleLoginForm, setVisibleLoginForm] = useState(true)

    const { user } = useAuth()
    
    const redirectUrl = window.location.search.split('=')[1]

    useEffect(() => {
        if (localStorage.getItem('pro-fashion-user-id')) {
            if (redirectUrl) {
                window.location.replace(redirectUrl)
            } else {
                window.location.replace('/')
            }
        }
    }, [redirectUrl])

    return (
        <div className="loginComp">
            <div className="container">
                <div className="row">
                    {
                        user ?
                            <div className="loginPageUserAlert">
                                <br /><br /><br /><br />
                                
                                <br /><br /><br /><br />
                            </div>
                            :
                            <div style={{ margin: "0 auto" }} className="col-4 card mt-5">
                                <div className="card-body">
                                    {
                                        visibleLoginForm ?
                                            <SignIn setLogin={setVisibleLoginForm} />
                                            :
                                            <SignUp setLogin={setVisibleLoginForm} />
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;