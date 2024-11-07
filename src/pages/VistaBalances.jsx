import React from "react";
import { NavLink } from "react-router-dom";
import BalanceEstatico from "../images/obediente.png";
import BalanceDinamico from "../images/documento.png";
import ButtonAtras from "../component/ButtonAtras";

export const VistaBalances = () => {
    return (
        <div className="min-h-screen flex flex-col bg-red-700">
            <ButtonAtras />
            <div className="flex justify-center items-center mt-16">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-5xl text-center">
                    <h1 className="mb-10 text-5xl text-red-600 font-bold">
                        Balances Generales
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Balance Estático */}
                        <NavLink
                            to="/balances"
                            className="rounded-lg shadow-lg p-6 m-4 bg-gradient-to-r from-orange-500 to-yellow-400 hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col items-center"
                            aria-label="Ir a Balance Estático"
                        >
                            <img src={BalanceEstatico} className='h-16 mb-1'/>
                            <h3 className="font-bold text-lg">Balances Estáticos</h3>
                            <p className="mt-2 text-sm">Refrescante y tropical, como Fanta Naranja.</p>
                        </NavLink>

                        {/* Balance Dinámico */}
                        <NavLink
                            to="/ingreso-datos-dinamico"
                            className="rounded-lg shadow-lg p-6 m-4 bg-gradient-to-r from-purple-500 to-pink-400 hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col items-center"
                            aria-label="Ir a Balance Dinámico"
                        >
                            <img src={BalanceDinamico} className='h-16 mb-1'/>
                            <h3 className="font-bold text-lg">Balances Dinámicos</h3>
                            <p className="mt-2 text-sm">Exótico y vibrante, como Fanta Uva.</p>
                        </NavLink>
                    </div>    
                </div>
            </div>
        </div>
    );
}
