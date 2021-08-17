import React, { useState, useEffect } from "react";
import axios from "axios"
import { useHistory } from 'react-router-dom';


const Auth = (props: any) => {
    const [registerName, setRegisterName] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginName, setLoginName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [token, setToken] = useState("");
    const history = useHistory();

    const register = async (e: any) => {
        e.preventDefault()
        try {
            const call = await axios({
                method: "POST",
                data: {
                    email: registerEmail,
                    name: registerName,
                    password: registerPassword,
                },
                url: "https://photodb-backend-capstone.herokuapp.com/api/register"
            })
            setToken(call.data.token);
            const expires = (new Date(Date.now() + 864000000 * 1000)).toUTCString();
            document.cookie = `token=${token}; secure=true; samesite=lax; max-age=${expires + 1}; http-only=true`;

            alert("User Created Please Login")
            window.location.reload();
        } catch (error) {
            alert("user alredy exists")
            console.log(error)
        }
    }
    useEffect(() => {

        const expires = (new Date(Date.now() + 864000000 * 1000)).toUTCString();
        document.cookie = `token=${token}; secure=true; samesite=lax; expires=${expires + 1}; http-only=true`;

        if (token !== "" || undefined || null) {
            history.push('/')

        }
    })

    const login = async (e: any) => {
        e.preventDefault()

        try {
            const call = await axios({
                method: "POST",
                data: {
                    email: loginEmail,
                    name: loginName,
                    password: loginPassword,
                },
                url: "https://photodb-backend-capstone.herokuapp.com/api/login"
            })
            if (token === "" || undefined || null) {
                setToken(call.data.token);
            }

        } catch (error) {
            alert("Invalid Credentials")
            console.log(error)
        }
    }


    return (
        <div className="auth">
            <h3 className={isSignup ? "auth__option" : "active"} onClick={() => setIsSignup(false)} >Log In</h3>
            <h3 className={isSignup ? "active" : "auth__option"} onClick={() => setIsSignup(true)}>Register</h3>
            <form autoComplete="new-false" className="auth__form">
                <h2>{isSignup ? "Register" : "Login"}</h2>
                {
                    isSignup ?
                        <div>
                            <div className="auth__form__input">
                                <input
                                    type="email" required
                                    autoComplete="new-false"
                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                    id="registerInput"
                                />
                                <label>Email</label>
                            </div>
                            <div className="auth__form__input">
                                <input
                                    type="password" required
                                    autoComplete="new-false"
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    id="registerInput"
                                />
                                <label>Password</label>
                            </div>
                            <div className="auth__form__input">
                                <input
                                    type="text" required
                                    autoComplete="new-false"
                                    onChange={(e) => setRegisterName(e.target.value)}
                                    id="registerInput"
                                />
                                <label>Name</label>
                            </div>

                            <button className="auth__form__btn" onClick={() => history.goBack()}>Back</button>
                            <button className="auth__form__btn" onClick={register}>Register</button>
                        </div>

                        :

                        <div>
                            <div className="auth__form__input">
                                <input
                                    type="email" required autoComplete="new-false"
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                                <label>Email</label>
                            </div>
                            <div className="auth__form__input" >
                                <input
                                    type="password" required
                                    autoComplete="new-false"
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                                <label>Password</label>
                            </div>
                            <div className="auth__form__input">
                                <input
                                    type="text" required
                                    autoComplete="new-false"
                                    onChange={(e) => setLoginName(e.target.value)}
                                />
                                <label>Name</label>
                            </div>
                            <button className="auth__form__btn" onClick={() => history.push('/')}>Back</button>
                            <button className="auth__form__btn" onClick={login}>Login</button>
                        </div>
                }


            </form>
        </div>
    )
}

export default Auth

