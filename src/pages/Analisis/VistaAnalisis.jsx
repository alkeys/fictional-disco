import ButtonAtras from "../../component/ButtonAtras.jsx";
import { NavLink } from "react-router-dom";
import BalanceEstatico from "../../images/obediente.png";
import BalanceDinamico from "../../images/documento.png";
import React from "react";
import {Animacionxd} from "../../component/Animacionxd.jsx";

export function VistaAnalisis() {
    return (
        <div className="min-h-screen flex flex-col bg-red-700 relative overflow-hidden">
            <Animacionxd></Animacionxd>

            <ButtonAtras />
            <div className="flex justify-center items-center mt-16">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl text-center">
                    <h1 className="mb-10 text-5xl text-red-600 font-bold">
                        Análisis Financiero
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Balance Estático */}
                        <NavLink
                            to="/Analisis-Estatico"
                            className="rounded-lg shadow-lg p-6 m-4 bg-gradient-to-r from-orange-500 to-yellow-400 hover:shadow-xl hover:scale-105 flex flex-col items-center transform transition-all duration-300 relative overflow-hidden"
                            aria-label="Ir a Balance Estático"
                        >
                            <img src={BalanceEstatico} className="h-16 mb-1" />
                            <h3 className="font-bold text-lg">Análisis Estático</h3>
                            <p className="mt-2 text-sm">Visión clara y precisa de tu balance.</p>
                        </NavLink>

                        {/* Balance Dinámico */}
                        <NavLink
                            to="/ingreso-datos-dinamico"
                            className="rounded-lg shadow-lg p-6 m-4 bg-gradient-to-r from-purple-500 to-pink-400 hover:shadow-xl hover:scale-105 flex flex-col items-center transform transition-all duration-300 relative overflow-hidden"
                            aria-label="Ir a Balance Dinámico"
                        >
                            <img src={BalanceDinamico} className="h-16 mb-1" />
                            <h3 className="font-bold text-lg">Análisis Dinámico</h3>
                            <p className="mt-2 text-sm">Interactúa con los datos y obtén resultados al instante.</p>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
