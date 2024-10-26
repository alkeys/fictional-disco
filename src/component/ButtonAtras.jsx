import React from "react";
import { useNavigate } from "react-router-dom";
import flechaAtras from "../images/back-button-white.png";

const ButtonAtras = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <button className="mx-4 my-3" onClick={handleBack}>
            <img 
                src={flechaAtras}
                alt="atrás"
                className="w-7 h-7"
            />
        </button>
    );
}

export default ButtonAtras;
