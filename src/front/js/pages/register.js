import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";



export const NewAccount = () => {
    const { actions } = useContext(Context)
    const navigate = useNavigate();

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
        await actions.createAccount(log)
        navigate("/Login")

        setLog({
            email: "",
            password: ""
        });

    }

    return (
        <>
            <h3 className="text-center display-4">Register</h3>
            <div className="container border border-4 box shadow-2 p-4 d-flex justify-content-center">
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
                            <label htmlFor="password" className="form-control-label mt-2">
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
                        <div className=" d-flex justify-content-around mt-3">
                            <div>
                                <button type="submit" className="btn btn-primary my-2 col-">
                                    Crear
                                </button>
                            </div>
                            <div className="">
                                <p className="fw-bold">
                                    <Link to={"/"} className="btn btn-danger mt-2">Back</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );

};