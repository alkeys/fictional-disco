import React, {useState, useEffect} from "react";
import { obtenerDocumentosall } from "../Services/Firebase/Crudfirebase";

const ModDatos = () => {
    const nameCollection = import.meta.env.VITE_NAME_COLLECTION;
    
    const handleObtener = async () => {
        const document = await obtenerDocumentosall(nameCollection);
        console.log(document);
    }

    return (
        <div>
            <button onClick={handleObtener}>Obtener</button>
        </div>
    );
}

export default ModDatos;