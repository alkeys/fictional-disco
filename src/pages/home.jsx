import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-700">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl text-center">
                <h1 className="text-6xl text-red-600 mb-4" style={{ fontFamily: 'LOKICOLA' }}>
                    Bienvenido a CocaCola Financials
                </h1>
                <p className="text-gray-800 mb-8">
                    Tu herramienta de análisis financiero con la energía y frescura de Coca-Cola. ¡Explora reportes,
                    revisa balances generales, y más!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <NavLink
                        to="/analisis"
                        className="rounded-lg shadow-lg p-6 text-white bg-gradient-to-r from-red-700 to-red-500 hover:shadow-xl transition-transform transform hover:scale-105"
                        aria-label="Ir a Análisis de Datos"
                    >
                        <h3 className="font-bold text-lg">Análisis de Datos</h3>
                        <p className="mt-2 text-sm">Energía pura para tu análisis financiero.</p>
                    </NavLink>

                    <NavLink
                        to="/reportes"
                        className="rounded-lg shadow-lg p-6 text-gray-900 bg-gradient-to-r from-gray-200 to-gray-400 hover:shadow-xl transition-transform transform hover:scale-105"
                        aria-label="Ir a Reportes"
                    >
                        <h3 className="font-bold text-lg">Reportes</h3>
                        <p className="mt-2 text-sm">Claridad y transparencia al estilo Light.</p>
                    </NavLink>

                    <NavLink
                        to="/configuracion"
                        className="rounded-lg shadow-lg p-6 text-white bg-gradient-to-r from-black to-gray-800 hover:shadow-xl transition-transform transform hover:scale-105"
                        aria-label="Ir a Configuración"
                    >
                        <h3 className="font-bold text-lg">Configuración</h3>
                        <p className="mt-2 text-sm">Sofisticado y sin azúcar, como el Zero.</p>
                    </NavLink>

                    <NavLink
                        to="/balances"
                        className="rounded-lg shadow-lg p-6 text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-xl transition-transform transform hover:scale-105"
                        aria-label="Ir a Balances Generales"
                    >
                        <h3 className="font-bold text-lg">Balances Generales</h3>
                        <p className="mt-2 text-sm">Refrescante como una Fanta.</p>
                    </NavLink>

                    <NavLink
                        to="/estado-resultados"
                        className="rounded-lg shadow-lg p-6 text-green-700 bg-gradient-to-r from-green-300 to-green-500 hover:shadow-xl transition-transform transform hover:scale-105"
                        aria-label="Ir a Estado de Resultados"
                    >
                        <h3 className="font-bold text-lg">Estado de Resultados</h3>
                        <p className="mt-2 text-sm">Refrescante como Sprite.</p>
                    </NavLink>

                    <NavLink
                        to="/Ingreso_Datos"
                        className="rounded-lg shadow-lg p-6 text-white bg-gradient-to-r from-blue-700 to-blue-500 hover:shadow-xl transition-transform transform hover:scale-105"
                        aria-label="Ir a Ingresar Datos"
                    >
                        <h3 className="font-bold text-lg">Ingresar Datos</h3>
                        <p className="mt-2 text-sm">Potente y revitalizante, como Powerade.</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default HomePage;

