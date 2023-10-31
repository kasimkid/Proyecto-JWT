import React from "react";
import { useNavigate } from "react-router-dom";


export const Private = () => {
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate("/")
    }


    return (
        <>
            <h1>Private Page</h1>

            <p>
                <button className="btn btn-danger" onClick={handleLogOut}>Log Out</button>
            </p>
        </>
    );
}