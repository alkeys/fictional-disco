import React from "react";
import ModDatos from "../component/ModificarDatos";

export const ModificarDatos = () => {
    return (
        <div className="bg-red-700 pb-6">
            <div className="flex flex-col text-center px-10 py-4 bg-red-700">
                <h1 className="text-5xl font-bold mb-6 text-white">
                    Modificar Datos
                </h1>
            </div>
            <div className="flex flex-col text-center py-6 mx-3 px-3 md:mx-10 md:px-10 border rounded-lg bg-white">
                <h1 className="text-2xl font-bold mb-6 text-black">
                    <ModDatos/>
                </h1>
            </div>
        </div>
    );
}