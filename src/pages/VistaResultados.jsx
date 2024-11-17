import React from "react";
import { NavLink } from "react-router-dom";
import EstadoEstatico from "../images/obediente.png";
import EstadoDinamico from "../images/documento.png";
import ButtonAtras from "../component/ButtonAtras";

export const VistaResultados = () => {
    return (
        <div className="min-h-screen flex flex-col bg-red-700">
            <div>
                <ButtonAtras />
            </div>
            <div className="flex justify-center items-center mt-16">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl text-center">
                    <h1 className="mb-10 text-5xl text-red-600 font-bold">
                        Estados de Resultados
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Estado Estático */}
                        <NavLink
                            to="/estado-resultados"
                            className="rounded-lg shadow-lg p-6 m-4 bg-gradient-to-r from-green-500 to-lime-400 hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col items-center"
                            aria-label="Ir a Estado Estático"
                        >
                            <img src={EstadoEstatico} className='h-16 mb-1'/>
                            <h3 className="font-bold text-lg">Estado Estático</h3>
                            <p className="mt-2 text-sm">Refrescante y clásico, como Sprite Limón.</p>
                        </NavLink>

                        {/* Estado Dinámico */}
                        <NavLink
                            to="/estados_dinamicos"
                            state={{ typeEstado: "Estado de Resultados" }}
                            className="rounded-lg shadow-lg p-6 m-4 bg-gradient-to-r from-teal-500 to-green-400 hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col items-center"
                            aria-label="Ir a Estado Dinámico"
                        >
                            <img src={EstadoDinamico} className='h-16 mb-1'/>
                            <h3 className="font-bold text-lg">Estado Dinámico</h3>
                            <p className="mt-2 text-sm">Dulce y fresco, como Sprite Tropical.</p>
                        </NavLink>
                    </div>    
                </div>
            </div>
        </div>
    );
}
