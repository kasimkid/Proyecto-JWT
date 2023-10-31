import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export const Login = () => {
    const { actions } = useContext(Context)
    const navigate = useNavigate()


    const [log, setLog] = useState({
        email: "",
        password: "",
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLog({ ...log, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await actions.login(log)
        if (data && data.token){
            localStorage.setItem("token", data.token)
        }

        setLog({
            email: "",
            password: ""
        });
        navigate("/private")

    }

    return (
        <>
            <h3 className="text-center display-4">Log In</h3>
            <div className="container d-flex justify-content-center">
                <div className="  w-50 border border-4 shadow rounded p-4 mt-2">
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label htmlFor="inputEmail" className="form-label">
                                Correo
                            </label>
                            <div>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="email@gmail.com"
                                    value={log.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="password" className="form-control-label">
                                Contraseña
                            </label>
                            <div>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Contraseña"
                                    value={log.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <button type="submit" className="btn btn-primary my-2 col-">
                                Ingresar
                            </button>
                        </div>
                    </form>
                </div>

            </div>
            <div className="">
                <p className=" text-center fw-bold">
                    <Link to={"/"} className="btn btn-danger mt-3">Back Home</Link>
                </p>
            </div>
        </>

    );
}